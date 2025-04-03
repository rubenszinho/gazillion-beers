import { Box, keyframes, styled, useTheme } from '@mui/material';
import { FC } from 'react';
import { beerColors } from '../theme/beerTheme';

const fillBeer = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 75%;
  }
`;

const generateBubbles = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
`;

const MugContainer = styled(Box)(({ theme }) => ({
    width: '100px',
    height: '120px',
    position: 'relative',
    margin: '0 auto',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(1),
}));

const Mug = styled(Box)(({ }) => ({
    width: '80px',
    height: '100px',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'transparent',
    border: '4px solid #e6e6e6',
    borderRadius: '0 0 10px 10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1), inset 0 0 0 4px rgba(255,255,255,0.1)',
    overflow: 'hidden',
}));

const Handle = styled(Box)(({ }) => ({
    width: '20px',
    height: '50px',
    position: 'absolute',
    right: '-24px',
    top: '25%',
    border: '4px solid #e6e6e6',
    borderLeft: 'none',
    borderRadius: '0 10px 10px 0',
}));

const Beer = styled(Box)(({ theme, filled }: { theme: any; filled: boolean }) => ({
    width: '100%',
    height: filled ? '75%' : '0%',
    position: 'absolute',
    bottom: 0,
    background: `linear-gradient(to bottom, ${theme.palette.primary.light || beerColors.lightAmber}, ${theme.palette.primary.main || beerColors.amber})`,
    animation: filled ? `${fillBeer} 1.5s ease-out` : 'none',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '10px',
        background: 'linear-gradient(transparent, rgba(255, 255, 255, 0.7), transparent)',
        borderRadius: '50%',
        opacity: 0.7,
    },
}));

const Foam = styled(Box)(({ visible }: { visible: boolean }) => ({
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    height: '18px',
    backgroundColor: beerColors.foam,
    borderRadius: '50% 50% 0 0',
    boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.1)',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.3s ease-in',
    zIndex: 2,
}));

const Bubble = styled(Box)(({ delay, left }: { delay: number; left: number }) => ({
    position: 'absolute',
    bottom: 0,
    left: `${left}px`,
    width: '8px',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '50%',
    animation: `${generateBubbles} 2s ease-in infinite`,
    animationDelay: `${delay}s`,
}));

interface BeerMugProps {
    filled: boolean;
}

const BeerMug: FC<BeerMugProps> = ({ filled }) => {
    const theme = useTheme();
    const bubbles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 60 + 10,
        delay: Math.random() * 2,
    }));

    return (
        <MugContainer>
            <Mug>
                <Foam visible={filled} />
                <Beer filled={filled} theme={theme}>
                    {filled &&
                        bubbles.map((bubble) => (
                            <Bubble key={bubble.id} delay={bubble.delay} left={bubble.left} />
                        ))}
                </Beer>
            </Mug>
            <Handle />
        </MugContainer>
    );
};

export default BeerMug;
