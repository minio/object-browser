import {
    Box,
    Typography,
    Chip,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import SectionTitle from '../../Common/SectionTitle';
import { useEffect } from 'react';
import api from "../../../../common/api";


//TODO:call sdk to have actual data.
const healthData = [
    { url: 'storage1.example.com', status: 'Healthy' },
    { url: 'storage3.example.com', status: 'Healthy' },
    { url: 'storage4.example.com', status: 'Healthy' },
    { url: 'storage5.example.com', status: 'Healthy' },
    { url: 'storage6.example.com', status: 'Healthy' },
    { url: 'storage7.example.com', status: 'Healthy' },
    { url: 'storage8.example.com', status: 'Healthy' },
    { url: 'storage2.example.com', status: 'Down' },
    { url: 'storage3.example.com', status: 'Warning' },
];

const getStatusChip = (status: string) => {
    switch (status) {
        case 'Healthy':
            return <Chip label="Healthy" color="success" icon={<span>🟢</span>} />;
        case 'Down':
            return <Chip label="Down" color="error" icon={<span>🔴</span>} />;
        case 'Warning':
            return <Chip label="Warning" color="warning" icon={<span>🟡</span>} />;
        default:
            return <Chip label="Unknown" />;
    }
};

export default function BucketHealthInfo() {
    useEffect(()=>{
        api
        .invoke("GET", `/api/v1/buckets/test123/health`)
        .then((res: any) => {
            console.log("aaaaaa")

            console.log(res)
        })
        .catch((err: any) => {
        });
    },[])
    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom sx={{}}>
                Health Info
            </Typography>
            <Grid container spacing={2}>
                {healthData.map(({ url, status }) => (
                    <Grid item xs={12} sm={6} md={4} key={url}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                            }}
                        >
                            <CardContent>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {url}
                                </Typography>
                                {getStatusChip(status)}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
