FROM python:3.8-alpine

ENV DB_ADDRESS=db
ENV DB_USER=root
ENV DB_PASSWORD=admin
ENV DB_NAME=foodCoCTF
ENV AWS_SECRET=YouCapturedTheFlagAndWonTheChallengeParabens!!!

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt
COPY . /app

EXPOSE 5050

ENTRYPOINT ["flask", "run", "--host=0.0.0.0", "--port=5050"]
