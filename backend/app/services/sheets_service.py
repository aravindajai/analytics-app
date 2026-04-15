import gspread
from oauth2client.service_account import ServiceAccountCredentials

def get_sheet_data():
    scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/drive"
    ]

    creds = ServiceAccountCredentials.from_json_keyfile_name(
        "credentials.json", scope
    )

    client = gspread.authorize(creds)
    sheet = client.open_by_url("https://docs.google.com/spreadsheets/d/1hzSMqro9NnmD8vCnff7IjML8KXfUzpwS2HGijagyEJc/edit?usp=sharing").sheet1
    return sheet.get_all_records()