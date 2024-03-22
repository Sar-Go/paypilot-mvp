document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('paymentForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get selected payment category
        const paymentCategory = document.querySelector('input[name="paymentCategory"]:checked').value;

        // Get selected payment options
        const paymentOptions = [];
        const checkboxes = document.querySelectorAll('input[name="paymentOption"]:checked');
        checkboxes.forEach(function(checkbox) {
            paymentOptions.push(checkbox.value);
        });

        // Get amount paid
        const amountPaid = parseFloat(document.getElementById('amountPaid').value);

        // Log the values
        console.log("Payment Category:", paymentCategory);
        console.log("Payment Options:", paymentOptions);
        console.log("Amount Paid:", amountPaid);

        // Store payment details in localStorage
        storePaymentDetails(paymentCategory, paymentOptions, amountPaid);
    });

    function storePaymentDetails(category, options, amount) {
        const paymentDetails = {
            category: category,
            options: options,
            amount: amount
        };
        localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
        console.log("Payment details stored:", paymentDetails);
    }
});
