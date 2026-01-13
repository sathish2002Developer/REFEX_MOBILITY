<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.wpforms-form'); // Adjust if multiple forms
    const submitBtn = form.querySelector('button[type="submit"]');

    // Initially disable the submit button
    submitBtn.disabled = true;

    // Function to check if all required fields are filled
    function checkRequiredFields() {
        const requiredFields = form.querySelectorAll('[required]');
        let allFilled = true;

        requiredFields.forEach(function (field) {
            if (!field.value.trim()) {
                allFilled = false;
            }
        });

        // Enable/disable submit button
        submitBtn.disabled = !allFilled;
    }

    // Listen for changes in inputs
    form.addEventListener('input', checkRequiredFields);
});
</script>
<!-- end Simple Custom CSS and JS -->
