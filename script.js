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
        const amountPaid = document.getElementById('amountPaid').value;

        // Display selected payment category, options, and amount paid
        displayPaymentDetails(paymentCategory, paymentOptions, amountPaid);
    });

    function displayPaymentDetails(category, options, amount) {
        const paymentDetails = document.createElement('div');
        paymentDetails.innerHTML = `
            <h2>Payment Details</h2>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Options:</strong> ${options.join(', ')}</p>
            <p><strong>Amount Paid:</strong> ${amount}</p>
        `;
        document.body.appendChild(paymentDetails);
    }
});
