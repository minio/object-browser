import {
    Box,
    Typography,
    Chip,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import SectionTitle from '../../Common/SectionTitle';
import { useEffect, useState } from 'react';
import api from "../../../../common/api";
import { BucketHealth } from '../types';
import { ErrorResponseHandler } from '../../../../common/types';
import { useAppDispatch } from '../../../../store';
import { setErrorSnackMessage } from '../../../../systemSlice';
import { use } from 'i18next';

const getStatusChip = (status: string) => {
    switch (status) {
        case 'up':
            return <Chip label="Healthy" color="success" icon={<span>🟢</span>} />;
        case 'down':
            return <Chip label="Down" color="error" icon={<span>🔴</span>} />;
        case 'warning':
            return <Chip label="Warning" color="warning" icon={<span>🟡</span>} />;
        default:
            return <Chip label="Unknown" />;
    }
};

export default function BucketHealthInfo() {
    const dispatch = useAppDispatch();
    const [bucketHealth, setBucketHealth] = useState<BucketHealth[]>([])

    useEffect(() => {
        api
            .invoke("GET", `/api/v1/buckets/default/health`)
            .then((res: BucketHealth[]) => {

                const sortedBucketHealth = [...res].sort((a: BucketHealth, b: BucketHealth) =>
                    a.url.localeCompare(b.url)
                );

                setBucketHealth(sortedBucketHealth)
            })
            .catch((err: ErrorResponseHandler) => {
                dispatch(setErrorSnackMessage(err));
            });
    }, [])
    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom sx={{}}>
                Health Info
            </Typography>
            <Grid container spacing={2}>
                {bucketHealth.map(({ url, status }) => (
                    <Grid item xs={12} sm={6} md={4} key={url}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                            }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" sx={{ mb: 1, wordBreak: 'break-word' }}>
                                        {url}
                                    </Typography>
                                </Box>
                                <Box mt={2}>
                                    {getStatusChip(status)}

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
}
