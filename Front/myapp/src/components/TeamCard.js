import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function TeamCard() {
    const navigate = useNavigate();
  return (
    <Card sx={{ width: 320 }}>
        <div>
            <Typography level="title-lg">Teams</Typography>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
            <img
            src="/pics/49ers.jpg"
            loading="lazy"
            alt="Team"
            />
        </AspectRatio>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}> 
            <Button 
                variant="solid" 
                size="md" 
                color="primary" 
                aria-label="Compare" 
                sx={{ fontWeight: 600 }}
                onClick={() => navigate('/compare')} 
                > 
                Compare 
            </Button> 
            <Button 
                variant="solid" 
                size="md" 
                color="primary" 
                aria-label="Explore" 
                sx={{ fontWeight: 600 }}
                onClick={() => navigate('/team')} 
                > 
                Explore 
            </Button> 
        </CardContent>
    </Card>
  );
}