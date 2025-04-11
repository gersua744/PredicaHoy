// components/DonationButton.js (extracto)
const DonationButton = () => {
  const [open, setOpen] = useState(false);
  const [activeMethod, setActiveMethod] = useState(null);
  const [step, setStep] = useState('select'); // 'select', 'form', 'confirm'
  
  const handleMethodSelect = (method) => {
    setActiveMethod(method);
    setStep('form');
  };
  
  const handleBack = () => {
    setStep('select');
    setActiveMethod(null);
  };
  
  return (
    <>
      <Button 
        variant="contained" 
        color="secondary" 
        startIcon={<FavoriteBorderIcon />}
        onClick={() => setOpen(true)}
      >
        Donar
      </Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        className="donation-dialog"
      >
        <DialogTitle>
          Apoya nuestro ministerio
          {step !== 'select' && (
            <Button 
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              size="small"
              sx={{ position: 'absolute', left: 16, top: 16 }}
            >
              Volver
            </Button>
          )}
        </DialogTitle>
        
        <DialogContent>
          {step === 'select' ? (
            <MethodSelection onSelect={handleMethodSelect} />
          ) : (
            <PaymentForm method={activeMethod} onComplete={() => setStep('confirm')} />
          )}
        </DialogContent>
        
        {/* Resto del componente... */}
      </Dialog>
    </>
  );
};