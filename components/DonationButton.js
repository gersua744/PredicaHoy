import React, { useState, useEffect } from 'react';
import { 
  Button, Dialog, DialogTitle, DialogContent, DialogActions, 
  Typography, Grid, Card, CardContent, CardActions, 
  TextField, Snackbar, Alert, IconButton, Box, Stack,
  useTheme, CircularProgress, Link
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DonationButton() {
  const [open, setOpen] = useState(false);
  const [activeMethod, setActiveMethod] = useState(null);
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [step, setStep] = useState('select');
  const [amount, setAmount] = useState('25');
  const [processing, setProcessing] = useState(false);
  
  const theme = useTheme();
  
  // Asegurar que el modal inicie cerrado
  useEffect(() => {
    setOpen(false);
  }, []);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setActiveMethod(null);
      setStep('select');
      setAmount('25');
    }, 200);
  };
  
  const handleMethodSelect = (method) => {
    setActiveMethod(method);
    setStep('form');
  };
  
  const handleBack = () => {
    setStep('select');
    setActiveMethod(null);
  };
  
  const handleAmountChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      setAlertState({
        open: true,
        message: 'Por favor ingresa un monto válido',
        severity: 'error'
      });
      return;
    }
    
    setProcessing(true);
    
    try {
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: activeMethod,
          amount: parseFloat(amount),
          details: event.target ? Object.fromEntries(new FormData(event.target)) : {}
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAlertState({
          open: true,
          message: data.message || '¡Gracias por tu donación!',
          severity: 'success'
        });
        setStep('success');
      } else {
        setAlertState({
          open: true,
          message: data.message || 'Error al procesar la donación',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      setAlertState({
        open: true,
        message: 'Error de conexión. Por favor intenta nuevamente.',
        severity: 'error'
      });
    } finally {
      setProcessing(false);
    }
  };
  
  const handleAlertClose = () => {
    setAlertState({
      ...alertState,
      open: false
    });
  };
  
  const donationMethods = [
    {
      id: 'card',
      title: 'Tarjeta de Crédito/Débito',
      icon: <CreditCardIcon fontSize="large" />,
      description: 'Realiza tu donación con cualquier tarjeta de crédito o débito',
      action: () => handleMethodSelect('card')
    },
    {
      id: 'paypal',
      title: 'PayPal',
      icon: <PaymentIcon fontSize="large" />,
      description: 'Dona de forma rápida y segura usando PayPal',
      action: () => handleMethodSelect('paypal')
    },
    {
      id: 'transfer',
      title: 'Transferencia Bancaria',
      icon: <AccountBalanceIcon fontSize="large" />,
      description: 'Realiza una transferencia directa a nuestra cuenta',
      action: () => handleMethodSelect('transfer')
    }
  ];
  
  const renderPaymentForm = () => {
    switch (activeMethod) {
      case 'card':
        return (
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Ingresa los datos de tu tarjeta
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="cardName"
                  label="Nombre en la tarjeta"
                  fullWidth
                  required
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="cardNumber"
                  label="Número de tarjeta"
                  fullWidth
                  required
                  variant="outlined"
                  margin="normal"
                  inputProps={{ maxLength: 19 }}
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="expDate"
                  label="Fecha Exp. (MM/AA)"
                  fullWidth
                  required
                  variant="outlined"
                  margin="normal"
                  inputProps={{ maxLength: 5 }}
                  placeholder="MM/AA"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="cvv"
                  label="CVV"
                  fullWidth
                  required
                  variant="outlined"
                  margin="normal"
                  inputProps={{ maxLength: 4 }}
                  placeholder="123"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Monto a donar
                </Typography>
                <TextField
                  name="amount"
                  label="Cantidad $"
                  fullWidth
                  required
                  variant="outlined"
                  value={amount}
                  onChange={handleAmountChange}
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  {['10', '25', '50', '100'].map((value) => (
                    <Button 
                      key={value}
                      variant={amount === value ? "contained" : "outlined"}
                      onClick={() => setAmount(value)}
                      sx={{ minWidth: '60px' }}
                    >
                      ${value}
                    </Button>
                  ))}
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                disabled={processing}
                startIcon={processing ? <CircularProgress size={20} /> : null}
              >
                {processing ? 'Procesando...' : `Donar $${amount}`}
              </Button>
            </Box>
          </form>
        );
        
      case 'paypal':
        return (
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Donación con PayPal
            </Typography>
            
            <Typography variant="body2" paragraph>
              Serás redirigido a PayPal para completar tu donación de forma segura.
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Monto a donar
                </Typography>
                <TextField
                  name="amount"
                  label="Cantidad $"
                  fullWidth
                  required
                  variant="outlined"
                  value={amount}
                  onChange={handleAmountChange}
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  {['10', '25', '50', '100'].map((value) => (
                    <Button 
                      key={value}
                      variant={amount === value ? "contained" : "outlined"}
                      onClick={() => setAmount(value)}
                      sx={{ minWidth: '60px' }}
                    >
                      ${value}
                    </Button>
                  ))}
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                disabled={processing}
                startIcon={processing ? <CircularProgress size={20} /> : <PaymentIcon />}
              >
                {processing ? 'Procesando...' : 'Continuar a PayPal'}
              </Button>
            </Box>
          </form>
        );
        
      case 'transfer':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Transferencia Bancaria
            </Typography>
            
            <Typography variant="body1" paragraph>
              Puedes realizar tu donación mediante transferencia bancaria a la siguiente cuenta:
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3, bgcolor: theme.palette.background.default }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Banco
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Banco Nacional
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary">
                  Titular
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ministerio PredicaHoy
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary">
                  Cuenta
                </Typography>
                <Typography variant="body1" gutterBottom>
                  8734-9283-4728-3874
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary">
                  CLABE
                </Typography>
                <Typography variant="body1" gutterBottom>
                  29734827394827394823
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                  Referencia
                </Typography>
                <Typography variant="body1" gutterBottom>
                  DONACION PREDICAHOY
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Después de realizar tu transferencia, por favor envíanos un comprobante a 
              <Link href="mailto:donaciones@predicahoy.com" sx={{ ml: 1 }}>
                donaciones@predicahoy.com
              </Link> 
              para agradecerte personalmente.
            </Typography>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleClose}
              >
                Entendido
              </Button>
            </Box>
          </Box>
        );
        
      default:
        return null;
    }
  };
  
  const renderSuccessScreen = () => (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h5" gutterBottom>
        ¡Gracias por tu generosidad!
      </Typography>
      
      <Box sx={{ my: 3 }}>
        <img 
          src="/thank-you-image.png" 
          alt="Gracias" 
          style={{ 
            maxWidth: '200px', 
            borderRadius: '8px',
            display: 'block',
            margin: '0 auto'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </Box>
      
      <Typography variant="body1" paragraph>
        Tu donación de <strong>${amount}</strong> ayudará a mantener y mejorar 
        PredicaHoy para la comunidad cristiana.
      </Typography>
      
      <Typography variant="body2" paragraph sx={{ fontStyle: 'italic' }}>
        "Cada uno debe dar según lo que haya decidido en su corazón, no de mala 
        gana ni por obligación, porque Dios ama al que da con alegría." 
        <br />2 Corintios 9:7
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleClose}
        sx={{ mt: 2 }}
      >
        Cerrar
      </Button>
    </Box>
  );
  
  const renderMethodSelection = () => (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Selecciona un método de donación
      </Typography>
      
      <Grid container spacing={3}>
        {donationMethods.map((method) => (
          <Grid item xs={12} sm={4} key={method.id}>
            <Card 
              className={`donation-method-card`}
              raised
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                },
                bgcolor: theme.palette.background.paper
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                  {method.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {method.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {method.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button 
                  size="large" 
                  color="primary" 
                  onClick={method.action}
                >
                  Seleccionar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
  
  return (
    <>
      <Button 
        variant="contained" 
        color="secondary" 
        startIcon={<FavoriteBorderIcon />}
        onClick={handleOpen}
      >
        Donar
      </Button>
      
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {step === 'select' ? (
            'Apoya nuestro ministerio'
          ) : step === 'success' ? (
            'Donación completada'
          ) : (
            <>
              <IconButton
                aria-label="back"
                onClick={handleBack}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              Detalles de la donación
            </>
          )}
          
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          {step === 'select' && renderMethodSelection()}
          {step === 'form' && renderPaymentForm()}
          {step === 'success' && renderSuccessScreen()}
        </DialogContent>
      </Dialog>
      
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert 
          onClose={handleAlertClose} 
          severity={alertState.severity} 
          sx={{ width: '100%' }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </>
  );
}
