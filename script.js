document.getElementById("calculateBtn").addEventListener("click", function(event) {
    event.preventDefault();
    calculateRepayments();
});

document.getElementById("clearAll").addEventListener("click", function() {
    document.getElementById("mortgageForm").reset();
    document.getElementById("monthlyRepayment").textContent = "£0.00";
    document.getElementById("totalRepayment").textContent = "£0.00";
    document.getElementById("mortgageAmount").value = "";
});

function calculateRepayments() {
    const mortgageAmount = parseFloat(document.getElementById("mortgageAmount").value.replace(/,/g, ''));
    const interestRate = parseFloat(document.getElementById("interestRate").value) / 100 / 12;
    const mortgageTerm = parseFloat(document.getElementById("mortgageTerm").value) * 12;
    const mortgageType = document.querySelector('input[name="mortgageType"]:checked').value;

    let monthlyRepayment;
    if (mortgageType === "repayment") {
        monthlyRepayment = (mortgageAmount * interestRate * Math.pow(1 + interestRate, mortgageTerm)) / (Math.pow(1 + interestRate, mortgageTerm) - 1);
    } else {
        monthlyRepayment = mortgageAmount * interestRate;
    }

    const yearlyRepayment = monthlyRepayment * 12;
    const totalRepayment = monthlyRepayment * mortgageTerm;

    document.getElementById("monthlyRepayment").textContent = "£" + formatNumber(monthlyRepayment.toFixed(2));
    document.getElementById("totalRepayment").textContent = "£" + formatNumber(totalRepayment.toFixed(2));
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
