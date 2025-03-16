import {CohereClientV2} from "cohere-ai";

const cohere = new CohereClientV2({
  token: '3MQzifzGkzMsKG5sbCtkwJtAYnWjoGgNZOpfPDNG',
});

(async () => {
  const response = await cohere.chat({
    model: 'command-r-plus',
    messages: [
      {
        role: 'user',
        content: 'hello world!',
      },
    ],
  });

  console.log(response.message.content);
})();
