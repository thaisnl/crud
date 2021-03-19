FROM python:3.7

EXPOSE 5000

ENV PYTHODONTWRITEBYTECODE 1

ENV PYTHONBUFFERED 1

ADD requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /app
ADD . /app

RUN chmod u+x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]