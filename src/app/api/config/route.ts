import { NextResponse } from "next/server";
import type { Config, ConfigResponse } from "@/types/config";
const CONFIG_URL='https://raw.githubusercontent.com/nassim-kada/exchange_rate_Flory/refs/heads/main/config.json'

export async function GET(){
    try{
        const response=await fetch(CONFIG_URL,{
            cache:'no-store',
        });
        if(!response.ok){
            return NextResponse.json(
                {error:'Failed to fetch data'},
                {status:response.status}
            )
        }
        const config:Config=await response.json();
        return NextResponse.json({
            exchangeRate:config.exchangeRate
        })
    }catch(error){
        return NextResponse.json(
            {error:'Internal server error'},
            {status:500}
        )
    }
}