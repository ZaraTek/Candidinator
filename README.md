# LocalVoice

LocalVoice allows citizens to enter their address to find local election candidates, providing basic candidate information (e.g., party affiliation, website, and photo). It offers an email template generator where voters can select key social and political issues to ask about, enabling informed voting. Additionally, voters can enter a specific issue they want to address, which will be integrated into the email template.

## Table of Contents
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Contact](#contact)

## Usage

As we don't currently have a server, our site is hosted on our GitHub repository at [LocalVoice](https://github.com/ZaraTek/Candidinator).
In script.js there are 2 global variables for a Google API Key as well as an OpenAI key. Follow the instructions for each in the provided links and enter your API keys.
Google Civic Info API: https://developers.google.com/civic-information
OpenAI API: https://platform.openai.com/docs/overview

## Features

1. **Candidate Finder** - Identifies candidates for a voter’s local election based on their address.
2. **Candidate Biography** - Provides basic information about candidates, such as party affiliation, photo, and website.
3. **Email Template Generator** - Generates an email template where voters can select important political or social issues to include.

## Contributing

### Authors
- **Malachy Fernandez**
- **Zara Tekmen**
- **Kyle Hoffman**

### Tools and APIs
- **Generative AI**: Used as a search tool to assist in implementing UI stylistic choices. Our website also calls OpenAI's ChatGPT-4 mini model to enhance the email template. ChatGPT wrote the outline for this README.
- **Google Civic Information API**: Retrieves basic information about candidates running for office in local elections based on voters' addresses.
- **Figma**: Used for designing some UI elements of the website.

## Contact

- **Malachy Fernandez**
  - Email: mjferna3@ncsu.edu
- **Zara Tekmen**
- **Kyle Hoffman**  
  - Email: kyhoffman@davidson.edu
