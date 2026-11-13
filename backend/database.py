from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Uses local SQLite so you can run & test immediately today.
# To switch to PostgreSQL later, replace with:
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/creatoriq_db"
SQLALCHEMY_DATABASE_URL = "sqlite:///./creatoriq.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()