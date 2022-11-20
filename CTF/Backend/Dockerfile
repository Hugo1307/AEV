FROM python:3.8-alpine

ENV DB_ADDRESS=db
ENV DB_USER=root
ENV DB_PASSWORD=admin
ENV DB_NAME=foodCoCTF

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt
COPY . /app

ENTRYPOINT ["python", "app.py"]