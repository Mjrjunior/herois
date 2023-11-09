import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from "next/image"
import { Card } from '@mui/material';

function sumPowerstats(powerstats: { [key: string]: number }) {
  return Object.values(powerstats).reduce((a, b) => a + b, 0);
}

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

interface HeroBattleProps {
  hero1: IHero;
  hero2: IHero;
  reset: () => void;
  selectedHeroes: IHero[];
}

const HeroBattle: React.FC<HeroBattleProps> = ({ hero1, hero2, reset, selectedHeroes }) => {
  const hero1Power = sumPowerstats(hero1.powerstats);
  const hero2Power = sumPowerstats(hero2.powerstats);

  const winner = hero1Power > hero2Power ? hero1 : hero2;

  const handleResetClick = () => {
    reset();
};

const rootRef = React.useRef<HTMLDivElement>(null);

  return (
      <Box
      sx={{
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        '@media all and (-ms-high-contrast: none)': {
          display: 'none',
        },
      }}
      ref={rootRef}
    >
      <Modal
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            width: 600,
            bgcolor: 'rgba(39 39 42)',
            border: '2px solid #000',
            p: 2,
          }}
        > 
          <Image 
          className='justify-start mb-10'
          src={selectedHeroes[0]?.images.md} 
          width={140}
          height={100}
          alt={''}>
          </Image>
          <Typography sx={{}} id="server-modal-title" variant="h6" component="h2">
            O vencedor é: {winner.name}
          </Typography>
          <Image 
          className='justify-end mb-10'
          src={selectedHeroes[1]?.images.md}
          width={140}
          height={100} 
          alt={''}>
          </Image>
          <button className='text-white flex justify-end items-end mb-0' onClick={handleResetClick}>Reset</button>
        </Box>
      </Modal>
    </Box>
  );
};

export default HeroBattle;