document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('paymentForm');

    // Payment options with their respective reward rates
    const paymentOptions = [
        { name: 'Debit Card', rewardRateEcommerce: 0.0001, rewardRateTravel: 0.0001 },
        { name: 'Millenia', rewardRateEcommerce: 0.05, rewardRateTravel: 0.001 },
        { name: 'Privilege', rewardRateEcommerce: 0.001, rewardRateTravel: 0.03 },
        { name: 'UPI', rewardRateEcommerce: 0.0001, rewardRateTravel: 0.0001 }
    ];

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get selected payment category
        const paymentCategory = document.querySelector('input[name="paymentCategory"]:checked').value;

        // Get selected payment options
        const selectedOptions = [];
        const checkboxes = document.querySelectorAll('input[name="paymentOption"]:checked');
        checkboxes.forEach(function(checkbox) {
            selectedOptions.push(checkbox.value);
        });

        // Get amount paid
        const amountPaid = parseFloat(document.getElementById('amountPaid').value);

        // Find the most rewarding payment option
        const { option: mostRewardingOption, rewardPoints } = findMostRewardingOption(paymentCategory, selectedOptions, amountPaid);
        
        // Display reward points and best payment option on the page with animation
        displayPaymentResult(mostRewardingOption, rewardPoints);

        setTimeout(() => {
            window.location.reload();
        }, 10000); // Reload after 10 seconds (adjust as needed)
    });

    function findMostRewardingOption(category, selectedOptions, amount) {
        let maxReward = 0;
        let mostRewardingOption = null;

        // Iterate through selected payment options
        selectedOptions.forEach(function(optionName) {
            // Find the payment option object
            const option = paymentOptions.find(opt => opt.name === optionName);

            // Check if option is available for the category and compute reward
            if (option) {
                let rewardRate = category === 'e-commerce' ? option.rewardRateEcommerce : option.rewardRateTravel;
                let reward = rewardRate * amount;

                // Update most rewarding option if this option gives higher reward
                if (reward > maxReward) {
                    maxReward = reward;
                    mostRewardingOption = optionName;
                }
            }
        });

        return { option: mostRewardingOption, rewardPoints: maxReward };
    }

    function displayPaymentResult(option, rewardPoints) {
        const resultContainer = document.getElementById('paymentResult');

        // Create a new element to display the result
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');
        resultElement.innerHTML = `
            <p>Best Payment Option: <strong>${option}</strong></p>
            <p>Reward Points: <strong>${rewardPoints}</strong></p>
        `;

        // Append the result element to the container
        resultContainer.appendChild(resultElement);

        // Animate the result to make it stand out
        resultElement.classList.add('animate__animated', 'animate__bounceIn');

        // Remove animation classes after animation ends
        resultElement.addEventListener('animationend', function() {
            resultElement.classList.remove('animate__animated', 'animate__bounceIn');
        });
    }
});
