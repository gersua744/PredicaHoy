import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
  useTheme,
  Tabs,
  Tab,
  FormControl,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const DonationModal = ({ open, onClose }) => {
  const theme = useTheme();
  const [activeMethod, setActiveMethod] = useState(null);
  const [step, setStep] = useState('select'); // 'select', 'form', 'success'
  const [tabValue, setTabValue] = useState(0);
  const [amount, setAmount] = useState('25');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardName: '',
    email: '',
    comment: ''
  });
  
  // Reset state when modal closes
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setActiveMethod(null);
      setStep('select');
      setAmount('25');
      setTabValue(0);
      setFormData({
        cardNumber: '',
        expDate: '',
        cvv: '',
        cardName: '',
        email: '',
        comment: ''
      });
    }, 300);
  };
  
  // Handle method selection
  const handleMethodSelect = (method) => {
    setActiveMethod(method);
    setStep('form');
  };
  
  // Handle back button
  const handleBack = () => {
    setActiveMethod(null);
    setStep('select');
  };
  
  // Handle amount selection
  const handleAmountClick = (value) => {
    setAmount(value);
  };
  
  // Handle amount input change
  const handleAmountChange = (e) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };
  
  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would process the payment
    console.log(`Processing ${amount} payment via ${activeMethod}`);
    
    // Show success message
    setStep('success');
  };
  
  // Payment methods data
  const donationMethods = [
    {
      id: 'paypal',
      title: 'PayPal',
      icon: <PaymentIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      description: 'Donación rápida y segura',
      action: () => handleMethodSelect('paypal')
    },
    {
      id: 'card',
      title: 'Tarjeta',
      icon: <CreditCardIcon sx={{ fontSize: 40, color: 'purple.500' }} />,
      description: 'Débito o crédito',
      action: () => handleMethodSelect('card')
    },
    {
      id: 'transfer',
      title: 'Transferencia',
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: 'green.600' }} />,
      description: 'Transferencia bancaria',
      action: () => handleMethodSelect('transfer')
    }
  ];
  
  // Render modal title
  const renderTitle = () => {
    if (step === 'select') {
      return 'Apoya Nuestro Ministerio';
    } else if (step === 'success') {
      return 'Gracias por tu donación!';
    } else {
      const methodTitles = {
        paypal: 'Donar con PayPal',
        card: 'Pago con Tarjeta',
        transfer: 'Transferencia Bancaria'
      };
      return methodTitles[activeMethod] || 'Detalles de la Donación';
    }
  };
  
  // Render payment method selection
  const renderMethodSelection = () => (
    <>
      <Typography variant="body1" paragraph>
        Tu donación nos ayuda a mantener y mejorar PredicaHoy, permitiéndonos seguir ofreciendo esta herramienta a pastores y líderes cristianos alrededor del mundo.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {donationMethods.map((method) => (
          <Grid item xs={12} md={4} key={method.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3
                }
              }}
              onClick={method.action}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  {method.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {method.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {method.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button size="small" color="primary">
                  Seleccionar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
  
  // Render payment forms based on selected method
  const renderPaymentForm = () => {
    switch (activeMethod) {
      case 'card':
        return (
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Número de Tarjeta"
                  fullWidth
                  required
                  placeholder="1234 5678 9012 3456"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Fecha de Expiración"
                  fullWidth
                  required
                  placeholder="MM/AA"
                  name="expDate"
                  value={formData.expDate}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Código CVV"
                  fullWidth
                  required
                  placeholder="123"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nombre en la Tarjeta"
                  fullWidth
                  required
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Monto a donar
                </Typography>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {['10', '25', '50', '100'].map((value) => (
                    <Grid item xs={3} key={value}>
                      <Button 
                        fullWidth
                        variant={amount === value ? 'contained' : 'outlined'}
                        onClick={() => handleAmountClick(value)}
                        sx={{ 
                          borderRadius: 2,
                          fontWeight: amount === value ? 600 : 400,
                          bgcolor: amount === value ? 'primary.main' : 'transparent',
                          borderColor: amount === value ? 'primary.main' : 'grey.300',
                          color: amount === value ? 'white' : 'text.primary',
                          '&:hover': {
                            bgcolor: amount === value ? 'primary.dark' : 'rgba(59, 130, 246, 0.08)',
                            borderColor: 'primary.main'
                          }
                        }}
                      >
                        ${value}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 1 }}>$</Typography>
                  <TextField
                    fullWidth
                    placeholder="Otra cantidad"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ 
                  py: 1.5, 
                  borderRadius: 2, 
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 10px -1px rgba(59, 130, 246, 0.4)',
                  }
                }}
              >
                Donar ${amount}
              </Button>
            </Box>
          </Box>
        );
        
      case 'paypal':
        return (
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="body2" paragraph>
              Serás redirigido a PayPal para completar tu donación de forma segura.
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Monto a donar
            </Typography>
            <Grid container spacing={1} sx={{ mb: 2 }}>
              {['10', '25', '50', '100'].map((value) => (
                <Grid item xs={3} key={value}>
                  <Button 
                    fullWidth
                    variant={amount === value ? 'contained' : 'outlined'}
                    onClick={() => handleAmountClick(value)}
                    sx={{ 
                      borderRadius: 2,
                      fontWeight: amount === value ? 600 : 400,
                      bgcolor: amount === value ? 'primary.main' : 'transparent',
                      borderColor: amount === value ? 'primary.main' : 'grey.300',
                      color: amount === value ? 'white' : 'text.primary',
                      '&:hover': {
                        bgcolor: amount === value ? 'primary.dark' : 'rgba(59, 130, 246, 0.08)',
                        borderColor: 'primary.main'
                      }
                    }}
                  >
                    ${value}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1 }}>$</Typography>
              <TextField
                fullWidth
                placeholder="Otra cantidad"
                value={amount}
                onChange={handleAmountChange}
              />
            </Box>
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={<PaymentIcon />}
                sx={{ 
                  py: 1.5, 
                  borderRadius: 2, 
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 10px -1px rgba(59, 130, 246, 0.4)',
                  }
                }}
              >
                Continuar a PayPal
              </Button>
            </Box>
          </Box>
        );
        
      case 'transfer':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Datos Bancarios
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 4, p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Banco
              </Typography>
              <Typography variant="body1" gutterBottom>
                Banco Nacional
              </Typography>
              
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Titular
              </Typography>
              <Typography variant="body1" gutterBottom>
                PredicaHoy Ministerios
              </Typography>
              
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Cuenta
              </Typography>
              <Typography variant="body1" gutterBottom>
                1234-5678-9012-3456
              </Typography>
              
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                CLABE
              </Typography>
              <Typography variant="body1" gutterBottom>
                012 345 678 901 234 567
              </Typography>
              
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Referencia
              </Typography>
              <Typography variant="body1">
                Donación PredicaHoy
              </Typography>
            </Card>
            
            <Typography variant="body2" gutterBottom>
              Una vez realizada la transferencia, puedes notificarnos para recibir un comprobante:
            </Typography>
            
            <Box component="form" sx={{ mt: 3 }}>
              <TextField 
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
              
              <TextField 
                label="Comentario (opcional)"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                name="comment"
                value={formData.comment}
                onChange={handleFormChange}
              />
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => setStep('success')}
              >
                He completado mi transferencia
              </Button>
            </Box>
          </Box>
        );
        
      default:
        return null;
    }
  };
  
  // Render success message
  const renderSuccessMessage = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 3 }} />
      
      <Typography variant="h5" gutterBottom>
        ¡Gracias por tu donación!
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        {activeMethod !== 'transfer' ? (
          `Tu donación de $${amount} ha sido procesada correctamente.`
        ) : (
          'Te agradecemos por realizar esta transferencia.'
        )}
        <br />
        Tu generosidad ayuda a que este ministerio siga creciendo y bendiciendo a más personas.
      </Typography>
      
      <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 4 }}>
        "Cada uno debe dar según lo que haya decidido en su corazón, no de mala 
        gana ni por obligación, porque Dios ama al que da con alegría."
        <br />2 Corintios 9:7
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleClose}
      >
        Cerrar
      </Button>
    </Box>
  );
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="donation-dialog-title"
    >
      <DialogTitle id="donation-dialog-title" sx={{ m: 0, p: 2 }}>
        {step === 'form' && activeMethod !== 'transfer' && (
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
        )}
        
        {renderTitle()}
        
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
        {step === 'success' && renderSuccessMessage()}
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
