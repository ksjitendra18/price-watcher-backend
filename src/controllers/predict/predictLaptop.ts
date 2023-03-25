import axios from "axios";
import { Request, Response } from "express";
export const prediction = async (req: Request, res: Response) => {
  const {
    company,
    type,
    ram,
    weight,
    touchScreen,
    ips,
    screenSize,
    screenResolution,
    cpu,
    hdd,
    ssd,
    gpu,
    os,
  } = req.body;

  console.log(req.body);

  const baseUrl = process.env.BASE_URL;

  const apiUrl = `/predict?company=${company}&type=${type}&ram=${ram}&weight=${weight}&touchScreen=${touchScreen}&ips=${ips}&screenSize=${screenSize}&screenResolution=${screenResolution}&cpu=${cpu}&hdd=${hdd}&ssd=${ssd}&gpu=${gpu}&os=${os}`;

  const url = baseUrl + apiUrl;

  console.log("url", url);

  //   const result = await axios.get(url);
  const result = await axios.get(url);

  res.status(200).json({
    success: true,
    predictedValue: result.data,
  });
};
