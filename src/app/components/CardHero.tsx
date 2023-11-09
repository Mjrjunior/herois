'use client'
import Image from "next/image"
import { Api } from '@/api'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from "react"
import {Search} from 'lucide-react'
import { CardActionArea } from "@mui/material"
import HeroBattle from "./HeroBattle"

interface IHero {
  id: number
  name: string
  images: {
    xs: string
    sm: string
    md: string
    lg: string
  }
  powerstats: {
    intelligence: number
    strength: number
    speed: number
    durability: number
    power: number
    combat: number
  }
}

export default function CardHero() {
    const [search, setSearch] = useState('')
    const [response, setResponse] = useState<IHero[]>([]);
    const [selectedHeroes, setSelectedHeroes] = useState<IHero[]>([]);
    
    useEffect(() => {
      const fetchData = async () => {
        const res = await Api.get("/");
        setResponse(res.data);
      };
      fetchData()
    }, []);
     //console.log(response)
    // console.log(search)
    console.log(selectedHeroes)

    const filteredHeroes = response.filter(hero => 
      hero.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleHeroClick = (item: IHero) => {
      if (selectedHeroes.length < 2) {
        setSelectedHeroes([...selectedHeroes, item]);
      }
    };

    function sumPowerstats(powerstats: { [key: string]: number }) {
      return Object.values(powerstats).reduce((a, b) => a + b, 0);
    }

    const resetHeroes = () => {
      setSelectedHeroes([]);
  };

  return (

    <div>
      <div className="flex justify-end mr-4 space-x-2 ">
        <Search size={40} className="text-white p-2 mt-4" />
        <input 
          className="bg-zinc-800 text-zinc-900 mt-4 p-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
          type="search" 
          value={search} 
          placeholder="Pesquisar Herói"
          onChange={(e) => {setSearch(e.target.value)}} />  
      </div>

      <div className="grid grid-cols-5 ml-20">
          {filteredHeroes.map((item: IHero) => (
            <CardActionArea key={item.id} onClick={() => {handleHeroClick(item)}} sx={{maxWidth: 220}} >
                <Card  sx={{ maxWidth: 220 }} style={style.customCardStyle}>
                <CardMedia>
                <Image
                  className="mt-8 rounded-xl"
                  src={item.images.lg}
                  alt={item.name}
                  width={140}
                  height={100}
                  />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary " style={style.customPowerstatsStyle}>
                      {sumPowerstats(item.powerstats)}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          ))}
        </div>
        {selectedHeroes.length === 2 && (
          <div style={style.cutomHeroBattleStyle}>
             <HeroBattle reset={resetHeroes} hero1={selectedHeroes[0]} hero2={selectedHeroes[1]} selectedHeroes={selectedHeroes} />
          </div>
    )}
    </div>

  )
}

const style = {
  customCardStyle: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center', // Alinhamento vertical
    justifyContent: 'center', // Alinhamento horizontal
    backgroundColor: 'rgba(39 39 42)',
    marginTop: '40px',
    boxShadow: 'none',
  },
  customPowerstatsStyle: {
    display: 'flex',
    alignItems: 'center', // Alinhamento vertical
    justifyContent: 'center', // Alinhamento horizontal
  },

  cutomHeroBattleStyle: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh'
  }
};