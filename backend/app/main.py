import os
import uuid
import time
import logging
from contextlib import asynccontextmanager
from typing import Optional, List
from dotenv import load_dotenv
from datetime import date

from fastapi import FastAPI, HTTPException, Request, Depends, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Date, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from app.schemas.chat import ChatRequest, ChatResponse, ChatError, ErrorDetail
from app.clients.langflow_client import create_langflow_client, LangFlowClient

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# === Database Configuration ===
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL) if DATABASE_URL else None
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False) if engine else None
Base = declarative_base()

# === SQLAlchemy ORM Models ===
class LoanApplication(Base):
    __tablename__ = "LoanApplication"

    id = Column(Integer, primary_key=True, index=True)
    applicationdate = Column(Date)
    age = Column(Integer)
    annualincome = Column(Numeric(12, 2))
    creditscore = Column(Numeric(5, 2))
    employmentstatus = Column(String)
    educationlevel = Column(String)
    experience = Column(Integer)
    loanamount = Column(Numeric(12, 2))
    loanduration = Column(Integer)
    maritalstatus = Column(String)
    numberofdependents = Column(Integer)
    homeownershipstatus = Column(String)
    monthlydebtpayments = Column(Numeric(12, 2))
    creditcardutilizationrate = Column(Numeric(5, 4))
    numberofopencreditlines = Column(Integer)
    numberofcreditinquiries = Column(Integer)
    debttoincomeratio = Column(Numeric(5, 4))
    bankruptcyhistory = Column(Boolean)
    loanpurpose = Column(String)
    previousloandefaults = Column(Boolean)
    paymenthistory = Column(String)
    lengthofcredithistory = Column(Integer)
    savingsaccountbalance = Column(Numeric(12, 2))
    checkingaccountbalance = Column(Numeric(12, 2))
    totalassets = Column(Numeric(14, 2))
    totalliabilities = Column(Numeric(14, 2))
    monthlyincome = Column(Numeric(12, 2))
    utilitybillspaymenthistory = Column(String)
    jobtenure = Column(Integer)
    networth = Column(Numeric(14, 2))
    baseinterestrate = Column(Numeric(5, 3))
    interestrate = Column(Numeric(5, 3))
    monthlyloanpayment = Column(Numeric(12, 2))
    totaldebttoincomeratio = Column(Numeric(5, 4))
    loanapproved = Column(Boolean)
    riskscore = Column(Numeric(5, 2))

# === Pydantic Models for Database Operations ===
class LoanApplicationCreate(BaseModel):
    applicationdate: Optional[str]
    age: int
    annualincome: float
    creditscore: float
    employmentstatus: str
    educationlevel: str
    experience: int
    loanamount: float
    loanduration: int
    maritalstatus: str
    numberofdependents: int
    homeownershipstatus: str
    monthlydebtpayments: float
    creditcardutilizationrate: float
    numberofopencreditlines: int
    numberofcreditinquiries: int
    debttoincomeratio: float
    bankruptcyhistory: bool
    loanpurpose: str
    previousloandefaults: bool
    paymenthistory: str
    lengthofcredithistory: int
    savingsaccountbalance: float
    checkingaccountbalance: float
    totalassets: float
    totalliabilities: float
    monthlyincome: float
    utilitybillspaymenthistory: str
    jobtenure: int
    networth: float
    baseinterestrate: float
    interestrate: float
    monthlyloanpayment: float
    totaldebttoincomeratio: float
    loanapproved: bool
    riskscore: float

    class Config:
        from_attributes = True

# Global client instance
langflow_client: Optional[LangFlowClient] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize the LangFlow client on startup."""
    global langflow_client
    
    try:
        # Load configuration from environment
        langflow_url = os.getenv("LANGFLOW_URL")
        langflow_api_key = os.getenv("LANGFLOW_API_KEY")
        langflow_flow_id = os.getenv("LANGFLOW_FLOW_ID")
        
        if not all([langflow_url, langflow_api_key, langflow_flow_id]):
            raise ValueError("Missing required LangFlow environment variables")
        
        langflow_client = create_langflow_client(
            base_url=langflow_url,
            api_key=langflow_api_key,
            flow_id=langflow_flow_id
        )
        
        logger.info("LangFlow client initialized successfully")
        
    except Exception as e:
        logger.error(f"Failed to initialize LangFlow client: {str(e)}")
        raise
    
    yield
    
    # Cleanup on shutdown
    langflow_client = None
    logger.info("Application shutdown complete")


# Create FastAPI app
app = FastAPI(
    title="Mortgage Chat API",
    description="FastAPI backend for Mortgage Chat LangFlow integration",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for your Builder.io frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://*.builder.io",
        "https://your-frontend-domain.com"  # Replace with your actual frontend domain
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# === Dependencies ===
def get_db():
    """Database session dependency."""
    if not SessionLocal:
        raise HTTPException(status_code=503, detail="Database not configured")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_langflow_client() -> LangFlowClient:
    """Dependency to get the LangFlow client instance."""
    if langflow_client is None:
        raise HTTPException(
            status_code=503,
            detail="LangFlow client not initialized"
        )
    return langflow_client


def generate_correlation_id() -> str:
    """Generate a unique correlation ID for request tracing."""
    return str(uuid.uuid4())


@app.middleware("http")
async def add_correlation_id(request: Request, call_next):
    """Add correlation ID to all requests for tracing."""
    correlation_id = generate_correlation_id()
    request.state.correlation_id = correlation_id
    
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    response.headers["X-Correlation-ID"] = correlation_id
    response.headers["X-Process-Time"] = str(process_time)
    
    return response


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler with correlation ID tracking."""
    correlation_id = getattr(request.state, 'correlation_id', generate_correlation_id())
    
    logger.error(f"Unhandled exception: correlation_id={correlation_id}, error={str(exc)}", exc_info=True)
    
    return JSONResponse(
        status_code=500,
        content=ChatError(
            error=ErrorDetail(
                detail="An internal server error occurred",
                code="INTERNAL_ERROR",
                correlation_id=correlation_id
            )
        ).dict(),
        headers={"X-Correlation-ID": correlation_id}
    )


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "langflow_client_ready": langflow_client is not None,
        "database_ready": SessionLocal is not None
    }


# === Database CRUD Endpoints ===
@app.get("/loans", response_model=List[LoanApplicationCreate])
def read_loans(db: Session = Depends(get_db)):
    """Get all loan applications."""
    return db.query(LoanApplication).all()


@app.post("/loans", response_model=LoanApplicationCreate)
def create_loan(application: LoanApplicationCreate, db: Session = Depends(get_db)):
    """Create a new loan application."""
    db_app = LoanApplication(**application.dict())
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    return db_app


@app.put("/loans/{loan_id}", response_model=LoanApplicationCreate)
def update_loan(loan_id: int, updated_data: LoanApplicationCreate, db: Session = Depends(get_db)):
    """Update an existing loan application."""
    loan = db.query(LoanApplication).filter(LoanApplication.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan application not found")
    
    for key, value in updated_data.dict().items():
        setattr(loan, key, value)
    
    db.commit()
    db.refresh(loan)
    return loan


@app.delete("/loans/{loan_id}")
def delete_loan(loan_id: int, db: Session = Depends(get_db)):
    """Delete a loan application."""
    loan = db.query(LoanApplication).filter(LoanApplication.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan application not found")
    
    db.delete(loan)
    db.commit()
    return {"message": f"Loan application {loan_id} deleted successfully"}


@app.get("/loans/search", response_model=List[LoanApplicationCreate])
def search_loans(
    age: Optional[int] = None,
    loanamount: Optional[float] = Query(None, description="Exact loan amount"),
    creditscore: Optional[float] = Query(None, description="Exact credit score"),
    employmentstatus: Optional[str] = Query(None, description="Partial match"),
    loanapproved: Optional[bool] = Query(None, description="Whether the loan was approved"),
    db: Session = Depends(get_db),
):
    """Search loan applications with filters."""
    query = db.query(LoanApplication)

    if age is not None:
        query = query.filter(LoanApplication.age == age)
    if loanamount is not None:
        query = query.filter(LoanApplication.loanamount == loanamount)
    if creditscore is not None:
        query = query.filter(LoanApplication.creditscore == creditscore)
    if employmentstatus is not None:
        query = query.filter(LoanApplication.employmentstatus.ilike(f"%{employmentstatus}%"))
    if loanapproved is not None:
        query = query.filter(LoanApplication.loanapproved == loanapproved)

    return query.all()


@app.post("/calculate-rate")
def calculate_rate(income: float, loan_amount: float, duration: int):
    """Calculate interest rate based on loan parameters."""
    base_rate = 3.5
    risk_factor = (loan_amount / income) * 0.1
    duration_factor = (duration / 12) * 0.05
    interest = base_rate + risk_factor + duration_factor
    return {"calculated_rate": round(interest, 2)}


@app.post("/agent", response_model=ChatResponse)
async def chat_agent(
    request: ChatRequest,
    http_request: Request,
    client: LangFlowClient = Depends(get_langflow_client)
) -> ChatResponse:
    """
    Main chat endpoint that forwards requests to LangFlow.
    
    Accepts a session_id and array of messages, returns the assistant's response
    with metadata including correlation tracking.
    """
    correlation_id = getattr(http_request.state, 'correlation_id', generate_correlation_id())
    
    logger.info(
        f"Chat request received: correlation_id={correlation_id}, "
        f"session_id={request.session_id}, message_count={len(request.messages)}"
    )
    
    try:
        # Validate that there's at least one user message
        user_messages = [msg for msg in request.messages if msg.role == "user"]
        if not user_messages:
            raise HTTPException(
                status_code=400,
                detail=ChatError(
                    error=ErrorDetail(
                        detail="At least one user message is required",
                        code="NO_USER_MESSAGE",
                        correlation_id=correlation_id
                    )
                ).dict()
            )
        
        # Send to LangFlow
        response = await client.send_message(
            messages=request.messages,
            session_id=request.session_id,
            correlation_id=correlation_id
        )
        
        logger.info(
            f"Chat response successful: correlation_id={correlation_id}, "
            f"session_id={request.session_id}, response_length={len(response.output_text)}"
        )
        
        return response
    
    except TimeoutError as e:
        logger.error(f"LangFlow timeout: correlation_id={correlation_id}, error={str(e)}")
        raise HTTPException(
            status_code=504,
            detail=ChatError(
                error=ErrorDetail(
                    detail="The AI service is taking too long to respond. Please try again.",
                    code="TIMEOUT",
                    correlation_id=correlation_id
                )
            ).dict()
        )
    
    except ValueError as e:
        logger.error(f"Validation error: correlation_id={correlation_id}, error={str(e)}")
        raise HTTPException(
            status_code=400,
            detail=ChatError(
                error=ErrorDetail(
                    detail=str(e),
                    code="VALIDATION_ERROR",
                    correlation_id=correlation_id
                )
            ).dict()
        )
    
    except ConnectionError as e:
        logger.error(f"Connection error: correlation_id={correlation_id}, error={str(e)}")
        raise HTTPException(
            status_code=502,
            detail=ChatError(
                error=ErrorDetail(
                    detail="Unable to connect to AI service. Please try again later.",
                    code="CONNECTION_ERROR",
                    correlation_id=correlation_id
                )
            ).dict()
        )
    
    except RuntimeError as e:
        logger.error(f"Runtime error: correlation_id={correlation_id}, error={str(e)}")
        raise HTTPException(
            status_code=502,
            detail=ChatError(
                error=ErrorDetail(
                    detail="AI service is currently unavailable. Please try again later.",
                    code="SERVICE_ERROR",
                    correlation_id=correlation_id
                )
            ).dict()
        )
    
    except Exception as e:
        logger.error(f"Unexpected error: correlation_id={correlation_id}, error={str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=ChatError(
                error=ErrorDetail(
                    detail="An unexpected error occurred. Please try again.",
                    code="UNKNOWN_ERROR",
                    correlation_id=correlation_id
                )
            ).dict()
        )


if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=os.getenv("ENVIRONMENT") == "development"
    )