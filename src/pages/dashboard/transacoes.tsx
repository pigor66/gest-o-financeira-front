import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Card, CardContent, CardHeader, CircularProgress, Grid, Typography } from "@mui/material"
import axios from "axios";
import { useState, useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatToCurrency } from "@/util/convertCurrentPtBr";
import { formatDate } from "@/util/convertDate";

const Transactions = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('https://66cd04d38ca9aa6c8cc9444f.mockapi.io/api/data');
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    console.log(data);
    
  }, []);



  return (
    <Grid container spacing={3} justifyContent={'center'}>
      {isLoading ?
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop> :

        <Grid item lg={8} xl={6}>
          <Card>
            <CardContent>
              {data?.map((item, index) => (
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  key={item.id}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                  >

                    <Typography width={'50%'} >
                      {formatToCurrency(item.value)}
                    </Typography>
                    <Typography width={'50%'} color={item.type === 'receita' ? 'secondary' : 'error'} textAlign={'end'}>
                      {item.type}
                    </Typography>

                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item lg={4} >
                        <Typography>
                          {item.Wallet}
                        </Typography>
                      </Grid>
                      <Grid item lg={4} >
                        <Typography>
                         {formatDate(item.date)}
                        </Typography>
                      </Grid>
                      <Grid item lg={4} >
                        <Typography>
                          {item.type === 'Receita' ? 'Recebido:' : 'Pago:'} {item.pay ? 'Sim' : 'Não'}
                        </Typography>
                      </Grid>

                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>

      }
    </Grid>
  )
}

export default Transactions;
