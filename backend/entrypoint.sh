#!/usr/bin/env bash
export FLASK_APP=run.py
flask db init
flask db migrate 
flask db upgrade
python run.py run --host=0.0.0.0