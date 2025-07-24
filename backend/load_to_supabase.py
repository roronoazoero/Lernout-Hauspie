import pandas as pd
from sqlalchemy import create_engine

# Load data
df = pd.read_csv('synthetic_loan_data.csv')
df.columns = [col.lower() for col in df.columns]  # match lowercase table schema

# Connect to Supabase DB
engine = create_engine("postgresql://postgres.zzqsxpgkzykghrutrfwb:Lernout&Hauspie@aws-0-eu-north-1.pooler.supabase.com:6543/postgres")

# Upload
df.to_sql('loanapplication', engine, if_exists='append', index=False)

print("✅ Data uploaded to Supabase.")
