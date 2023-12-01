import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = "main";

export default defineConfig({
  branch,
  clientId: "e1bb6772-79a4-4fb9-a598-cbe2f03a8555", // Get this from tina.io
  token: "633dc539d735a69b9dde8b6242335f1fc252dbc7", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "./",
    },
  },
  schema: {
    collections: [
      {
        name: 'clients',
        label: 'Clients',
        path: '',
        format: 'md',
        templates: [
          {
            name: 'clients',
            label: 'Clients',
            fields: [
              {
                type: "object",
                name: "clients",
                label: "Clients",
                ui: {
                  itemProps: (item) => {
                    return { label: item?.url }
                  }
                },
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "client_key",
                    label: "Client Key",
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "URL",
                  },
                  {
                    type: "string",
                    name: "google_analytics_id",
                    label: "Google Analytics ID",
                  },
                  {
                    type: "string",
                    name: "google_ads_conversion_id",
                    label: "Google Ads Conversion ID",
                  },
                  {
                    type: "string",
                    name: "google_ads_conversion_label",
                    label: "Google Ads Conversion Label",
                  },
                  {
                    type: "string",
                    name: "head_title",
                    label: "Head Title",
                  },
                  {
                    type: "string",
                    name: "head_description",
                    label: "Head Description",
                  },
                  {
                    type: "image",
                    name: "logo",
                    label: "Logo",
                  },
                  {
                    type: "rich-text",
                    name: "header_text",
                    label: "Header Text",
                  },
                  {
                    type: "rich-text",
                    name: "video_header_text",
                    label: "Video Header Text",
                  },
                  {
                    type: "string",
                    name: "video_embed_url",
                    label: "Video Embed URL",
                  },
                  {
                    type: "string",
                    name: "phone",
                    label: "Phone",
                  },
                  {
                    type: "rich-text",
                    name: "consent",
                    label: "Consent",
                  },
                  {
                    type: "rich-text",
                    name: "faqs_header",
                    label: "FAQs Header",
                  },
                  {
                    type: "object",
                    name: "faqs",
                    label: "FAQs",
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.question }
                      }
                    },
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "question",
                        label: "Question",
                      },
                      {
                        type: "rich-text",
                        name: "answer",
                        label: "Answer",
                      },
                    ],
                  },
                  {
                    type: "object",
                    name: "logo_cards",
                    label: "Logo Cards",
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.name }
                      }
                    },
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "name",
                        label: "Name",
                      },
                      {
                        type: "string",
                        name: "title",
                        label: "Title",
                      },
                      {
                        type: "string",
                        name: "company",
                        label: "Company",
                      },
                      {
                        type: "string",
                        name: "license",
                        label: "License Information",
                      },
                      {
                        type: "image",
                        name: "logo",
                        label: "Logo",
                      },
                    ],
                  },
                  {
                    type: "rich-text",
                    name: "disclaimer",
                    label: "Disclaimer",
                  },
                  {
                    type: "string",
                    name: "privacy_policy_url",
                    label: "Privacy Policy URL",
                  },
                  {
                    type: "string",
                    name: "licensing_url",
                    label: "Licensing URL",
                  },
                  {
                    type: "rich-text",
                    name: "managers",
                    label: "Managers",
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
  },
});
