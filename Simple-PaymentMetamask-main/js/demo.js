window.addEventListener('load', async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        initPayButton()
      } catch (err) {
        $('#status').html('Usuario denegado el acceso a la cuenta', err)
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      initPayButton()
    } else {
      $('#status').html('No se ha instalado Metamask (u otro proveedor Web3)')
    }
  })

  const initPayButton = () => {
    $('.pay-button').click(() => {
      // La dirección de pago es donde se enviarán los fondos.
    //  const paymentAddress = ''
      const paymentAddress = document.getElementById("paymentAddress").value;
      const amountEth = document.getElementById("amountEth").value;

      web3.eth.sendTransaction({
        to: paymentAddress,
        value: web3.toWei(amountEth, 'ether')
      }, (err, transactionId) => {
        if (err) {
          console.log('Pago fallido', err)
          $('#status').html('Pago fallido')
        } else {
          console.log('Payment successful', transactionId)
          $('#status').html('Pago exitoso')
        }
      })
    })
  }
