from fastapi import APIRouter, Query
from app.services.sheets_service import get_sheet_data
from app.services.analytics_service import process_data
from fastapi.responses import FileResponse
import pandas as pd

router = APIRouter()

@router.get("/analytics")
def get_analytics(start: str = None, end: str = None):
    data = get_sheet_data()
    result = process_data(data, start, end)
    return result


@router.get("/export")
def export_csv():
    data = get_sheet_data()
    df = pd.DataFrame(data)
    file_path = "export.csv"
    df.to_csv(file_path, index=False)
    return FileResponse(file_path, filename="export.csv")