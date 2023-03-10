import openai

API_KEY = "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"
openai.api_key = API_KEY


def get_reply(text):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=text,
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0)
    return response.choices[0].text


if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        # sentence = "do you use credit cards?"
        sentence = input("You: ")
        if sentence == "exit":
            break

        resp = get_reply(sentence)
        print(resp)


# while True:
    # text = input('Enter the prompt : ')
    # if text =='exit':
        # print('Thanks for using Openai')
        # break
    # else:
        # get_reply(text)
