from fastapi import FastAPI, HTTPException, Depends, Path, Request
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Date, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv
load_dotenv()

import os

# === Database config ===
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

# === SQLAlchemy ORM model ===
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

# === Pydantic model for request/response ===
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
        orm_mode = True

# === FastAPI app ===
app = FastAPI()

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# === Routes ===

@app.get("/loans", response_model=List[LoanApplicationCreate])
def read_loans(db: Session = Depends(get_db)):
    return db.query(LoanApplication).all()

@app.post("/loans", response_model=LoanApplicationCreate)
def create_loan(application: LoanApplicationCreate, db: Session = Depends(get_db)):
    db_app = LoanApplication(**application.dict())
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    return db_app

@app.put("/loans/{loan_id}", response_model=LoanApplicationCreate)
def update_loan(loan_id: int, updated_data: LoanApplicationCreate, db: Session = Depends(get_db)):
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
    loan = db.query(LoanApplication).filter(LoanApplication.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan application not found")
    
    db.delete(loan)
    db.commit()
    return {"message": f"Loan application {loan_id} deleted successfully"}

@app.post("/calculate-rate")
def calculate_rate(income: float, loan_amount: float, duration: int):
    # Simplified logic example
    base_rate = 3.5
    risk_factor = (loan_amount / income) * 0.1
    duration_factor = (duration / 12) * 0.05
    interest = base_rate + risk_factor + duration_factor
    return {"calculated_rate": round(interest, 2)}

from fastapi import Query

@app.get("/loans/search", response_model=List[LoanApplicationCreate])
def search_loans(
    age: Optional[int] = None,
    loanamount: Optional[float] = Query(None, description="Exact loan amount"),
    creditscore: Optional[float] = Query(None, description="Exact credit score"),
    employmentstatus: Optional[str] = Query(None, description="Partial match"),
    loanapproved: Optional[bool] = Query(None, description="Whether the loan was approved"),
    db: Session = Depends(get_db),
):
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

@app.post("/agent")
async def agent_proxy(request: Request):
    body = await request.json()
    user_input = body.get("input")

    payload = {
        "output_type": "chat",
        "input_type": "chat",
        "input_value": user_input,
        "session_id": "user_1"
    }

    langflow_url = os.getenv("LANGFLOW_URL")  # e.g., http://localhost:7860/api/v1/run/<flow_id>
    api_key = os.getenv("LANGFLOW_API_KEY")

    response = requests.post(
        langflow_url,
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key
        },
        json=payload
    )

    return response.json()