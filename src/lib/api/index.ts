import { useState, useEffect } from 'react'

const host = 'http://ztime.tech'

export const getZTimeAssetDatasByTagFilter = async (header:HeadersInit,body:BodyInit )=>{
 let response = await fetch(`${host}/ZTimeAsset/GetZTimeAssetDatasByTagFilter`, { method: 'POST', body ,headers: header});
return response
}
export const getZTimeAssetByAssetIDs = async (header:HeadersInit ,body:BodyInit )=>{
 let response = await fetch(`${host}/ZTimeAsset/GetZTimeAssetByAssetIDs`, { method: 'POST', body ,headers: header});
return response
}
export const getClassTagTreeForWeb = async (header:HeadersInit ,body:BodyInit )=>{
 let response = await fetch(`${host}/ZTimeAsset/GetClassTagTreeForWeb`, { method: 'POST', body ,headers: header});
return response
}
export const getDescriptionTagTreeForWeb = async (header:HeadersInit,body:BodyInit )=>{
 let response = await fetch(`${host}/ZTimeAsset/GetDescriptionTagTreeForWeb`, { method: 'POST', body ,headers: header});
return  response
}

