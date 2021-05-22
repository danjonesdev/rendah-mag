export default {
  name: "pack",
  title: "Pack",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "folder",
      title: "Folder",
      type: "file",
      options: {
        accept: ".zip",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Publish Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
