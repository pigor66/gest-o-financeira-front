import React, { useState, ChangeEvent } from 'react';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Grid,
  Button,
  SelectChangeEvent,
} from '@mui/material';

type TransactionType = 'receita' | 'despesa';
type Wallet = 'nubank' | 'c6' | 'picpay' | 'noBolso';
type ExpenseCategory = 'aluguel' | 'agua' | 'luz' | 'combustivel' | 'outros';
type IncomeCategory = 'salario' | 'freela';

interface FinanceFormProps {
  transactionType: TransactionType;
  wallet: Wallet | '';
  date: string;
  category: ExpenseCategory | IncomeCategory | '';
  paid: 'sim' | 'nao' | '';
  amount: string;
  handleTransactionTypeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleWalletChange: (event: SelectChangeEvent<Wallet>) => void;
  handleDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: SelectChangeEvent<ExpenseCategory | IncomeCategory>) => void;
  handlePaidChange: (event: SelectChangeEvent<'sim' | 'nao'>) => void;
  handleAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  sendData: () => void;
}

export default function TransitionForm({
  transactionType,
  wallet,
  date,
  category,
  paid,
  amount,
  handleTransactionTypeChange,
  handleWalletChange,
  handleDateChange,
  handleCategoryChange,
  handlePaidChange,
  handleAmountChange,
  sendData
}: FinanceFormProps) {

  return (
    <form>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={transactionType}
              onChange={handleTransactionTypeChange}
            >
              <FormControlLabel value="Receita" control={<Radio />} label="Receita" />
              <FormControlLabel value="Despesa" control={<Radio />} label="Despesa" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Carteira</InputLabel>
            <Select value={wallet} onChange={handleWalletChange}>
              <MenuItem value="nubank">Nubank</MenuItem>
              <MenuItem value="c6">C6</MenuItem>
              <MenuItem value="picpay">PicPay</MenuItem>
              <MenuItem value="noBolso">No Bolso</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Data (Mês e Ano)"
            type="month"
            value={date}
            onChange={handleDateChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Valor"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
            {transactionType === 'despesa' ?

              <Select value={category} onChange={handleCategoryChange}>
                <MenuItem value="aluguel">Aluguel</MenuItem>
                <MenuItem value="agua">Conta de Água</MenuItem>
                <MenuItem value="luz">Conta de Luz</MenuItem>
                <MenuItem value="combustivel">Combustível</MenuItem>
                <MenuItem value="outros">Outros</MenuItem>
              </Select>
              :
              <Select value={category} onChange={handleCategoryChange}>
                <MenuItem value="salario">Salário</MenuItem>
                <MenuItem value="freela">Freelance</MenuItem>
              </Select>

            }
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Pago</InputLabel>
            <Select value={paid} onChange={handlePaidChange}>
              <MenuItem value="sim">Sim</MenuItem>
              <MenuItem value="nao">Não</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} display={'flex'} alignItems={'center'}>
          <Button variant="contained" color="primary" fullWidth size='large' onClick={sendData}>
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
