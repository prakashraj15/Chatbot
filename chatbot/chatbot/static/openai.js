class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButtonOpenAi: document.querySelector(".send__button__openai"),
    };

    this.state = false;
    this.messages = [];
  }

  display() {
    const { openButton, chatBox, sendButtonOpenAi } = this.args;

    openButton.addEventListener("click", () => {
      this.toggleState(chatBox);
    });

    sendButtonOpenAi.addEventListener("click", () => {
      this.onSendButtonOpenAi(chatBox);
    });

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButtonOpenAi(chatBox);
      }
    });
  }

  toggleState(chatbox) {
    this.state = !this.state;

    // show or hides the box
    if (this.state) {
      chatbox.classList.add("chatbox--active");
      this.messages.push({
        name: "Sam",
        message: "Welcome to Chatbot!!",
      });
      this.updateChatText(chatbox);
    } else {
      chatbox.classList.remove("chatbox--active");
      this.messages = [];
      this.updateChatText(chatbox);
    }
  }

  onSendButtonOpenAi(chatbox) {
    var textField = chatbox.querySelector("input");
    let text1 = textField.value;

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    if (text1 === "") {
      return;
    }

    fetch($SCRIPT_ROOT + "/openAi", {
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        let msg2 = { name: "Sam", message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        this.updateChatText(chatbox);
        textField.value = "";
      });
  }

  updateChatText(chatbox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item, index) {
        if (item.name === "Sam") {
          html +=
            '<div class="messages__item messages__item--visitor">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });

    const chatmessage = chatbox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }
}

const chatbox = new Chatbox();
chatbox.display();
