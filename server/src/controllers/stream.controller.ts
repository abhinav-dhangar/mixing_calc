import { Request, Response } from "express";

export const streamController = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  const responseText =
    "hey tell me ";
  const words = responseText.trim().split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    // console.log(`Word ${i + 1}: ${words[i]}`);
    setTimeout(() => {
      res.write(JSON.stringify(words[i]));
      if (i === words.length - 1) {
        res.end();
      }
    }, 1000 * i);
  }

  //   data.forEach((item, index) => {
  //     setTimeout(() => {
  //       res.write(JSON.stringify(item));
  //       if (index === data.length - 1) {
  //         res.end();
  //       }
  //     }, 1000 * index);
  //   });  
};
