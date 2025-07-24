import pandas as pd
from sqlalchemy import create_engine

csv_path = 'synthetic_loan_data.csv'
df = pd.read_csv(csv_path)

db_user = 'postgres'
db_password = 'Jokicisjoker6!'
db_host = 'localhost'
db_port = '5432'
db_name = 'LoanApplications'

DATABASE_URL = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
engine = create_engine(DATABASE_URL)

table_name = 'LoanApplication'


bool_columns = ['BankruptcyHistory', 'PreviousLoanDefaults', 'LoanApproved']
for col in bool_columns:
    df[col] = df[col].astype(bool)

# df.to_sql(table_name, con=engine, if_exists='append', index=False)


# print(f" Synthetic Data uploaded to '{table_name}' successfully.")
print(DATABASE_URL)
