document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form[action="/todos"]');
  if (form) {
    form.addEventListener('submit', function(e) {
      const input = form.querySelector('input[name="text"]');
      if (input && !input.value.trim()) {
        e.preventDefault();
        alert('Please enter a todo!');
      }
    });
  }
});
