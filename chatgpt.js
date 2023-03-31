
//Script Usando o Modelo mais básico = "(text-davinci-003)"
//Pacotes: Chalk, Inquirer, Dotenv
//API Criada pela OPENAI, adaptado para uso de testes por: EEV

require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({

apiKey: process.env.OPENAI,  
});

const openai = new OpenAIApi(configuration);
async function start() {
  const { default: inquirer } = await import('inquirer');

  const { question } = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      prefix: '\n\t::: Olá Sr.Everton, O que você gostaria de saber hoje (?) :::\n\n'
    }
  ]);

  const { default: chalk } = await import('chalk');
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    temperature: 0,
    max_tokens: 1000,
  });

  console.log(chalk.green(response.data.choices[0].text));
};
start();
