import pandas as pd

def process_data(data, start=None, end=None):
    df = pd.DataFrame(data)

    df['date'] = pd.to_datetime(df['date'])

    if start and end:
        df = df[(df['date'] >= start) & (df['date'] <= end)]

    daily = df.groupby(df['date'].dt.date).sum().reset_index()
    weekly = df.groupby(df['date'].dt.isocalendar().week).sum().reset_index()
    monthly = df.groupby(df['date'].dt.month).sum().reset_index()

    return {
        "daily": daily.to_dict(orient="records"),
        "weekly": weekly.to_dict(orient="records"),
        "monthly": monthly.to_dict(orient="records"),
        "total_sales": int(df['sales'].sum()),
        "total_leads": int(df['leads'].sum())
    }