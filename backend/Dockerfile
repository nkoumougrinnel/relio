FROM python:3.11-slim
WORKDIR /app

# Copier requirements
COPY requirements/base.txt .
RUN pip install --no-cache-dir -r base.txt

# Copier le code backend
COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
