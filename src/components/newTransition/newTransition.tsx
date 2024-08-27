import { Box, Card, Grid, SelectChangeEvent, Typography } from "@mui/material"
import Content from "../content/content"
import TransitionForm from "../transitionForm/transitionForm"
import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";

type TransactionType = 'receita' | 'despesa';
type Wallet = 'nubank' | 'c6' | 'picpay' | 'noBolso';
type ExpenseCategory = 'aluguel' | 'agua' | 'luz' | 'combustivel' | 'outros';
type IncomeCategory = 'salario' | 'freela';

const NewTransition = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>('receita');
  const [wallet, setWallet] = useState<Wallet | ''>('');
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<ExpenseCategory | IncomeCategory | ''>('');
  const [paid, setPaid] = useState<'sim' | 'nao' | ''>('');
  const [pay, setPay] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');

  const handleTransactionTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransactionType(event.target.value as TransactionType);
    setCategory('');
  };

  const handleWalletChange = (event: SelectChangeEvent<Wallet>) => {
    setWallet(event.target.value as Wallet);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<ExpenseCategory | IncomeCategory>) => {
    setCategory(event.target.value as ExpenseCategory | IncomeCategory);
  };

  const handlePaidChange = (event: SelectChangeEvent<'sim' | 'nao'>) => {
    setPaid(event.target.value as 'sim' | 'nao');
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const sendData = () => {
    const data = {
      Wallet: wallet,
      date: date,
      value: amount,
      type: transactionType,
      pay: pay,
    };
  
    axios.post('https://66cd04d38ca9aa6c8cc9444f.mockapi.io/api/data', data)
      .then(() => {
        console.log('Deu certo');
      })
      .catch((error) => {
        console.error('Erro ao enviar dados:', error);
      });
  

  };


  useEffect(() => {
    paid === 'sim' ? setPay(true) : setPay(false)
  }, [paid])

  return (
    <Grid container spacing={3} justifyContent={'center'}>
      <Grid item lg={12}>
        <Typography variant='h4' textAlign={'center'}>
          Nova transação
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Content>
          <TransitionForm
            transactionType={transactionType}
            wallet={wallet}
            date={date}
            category={category}
            paid={paid}
            amount={amount}
            handleTransactionTypeChange={handleTransactionTypeChange}
            handleWalletChange={handleWalletChange}
            handleDateChange={handleDateChange}
            handleCategoryChange={handleCategoryChange}
            handlePaidChange={handlePaidChange}
            handleAmountChange={handleAmountChange}
            sendData={sendData}
          />
        </Content>

      </Grid>
    </Grid>
  )
}

export default NewTransition