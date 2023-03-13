from flask import Flask, render_template, request, jsonify

from chat import get_response
from gpt import get_reply
app = Flask(__name__)


@app.get("/")
def index_get():
    return render_template("base.html")


@app.get("/auto")
def openai_get():
    return render_template("openai.html")


@app.post("/openAi")
def openAi():
    text = request.get_json().get("message")
    response = get_reply(text)
    message = {"answer": response}
    return jsonify(message)


@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    response1 = get_response(text)
    message1 = {"answer": response1}
    return jsonify(message1)


if __name__ == "__main__":
    app.run(debug=True)
