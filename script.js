const $ = (id) => document.getElementById(id);

function formatINR(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(amount);
}
function prettyDate(value) {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}
function makeQuotationNumber() {
  const d = new Date();
  return `PW/${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
}
function addService() {
  const entry = $('serviceTemplate').content.firstElementChild.cloneNode(true);
  $('serviceEntries').append(entry);
  updateServiceEntryHeadings();
  return entry;
}
function updateServiceEntryHeadings() {
  const entries = [...document.querySelectorAll('.service-entry')];
  entries.forEach((entry, index) => {
    entry.querySelector('.service-entry-heading strong').textContent = `Service ${index + 1}`;
    entry.querySelector('.remove-service').hidden = entries.length === 1;
  });
}
function updateQuotation() {
  const entries = [...document.querySelectorAll('.service-entry')].map(entry => {
    const category = entry.querySelector('.service-type').value;
    const title = entry.querySelector('.service-title').value.trim() || category;
    const description = entry.querySelector('.service-description').value.trim() || 'Professional services tailored to the client requirements.';
    const qty = Math.max(1, Number(entry.querySelector('.service-quantity').value || 1));
    const unitAmount = Math.max(0, Number(entry.querySelector('.service-amount').value || 0));
    return { category, title, description, qty, total: qty * unitAmount };
  });
  const total = entries.reduce((sum, entry) => sum + entry.total, 0);
  const categories = [...new Set(entries.map(entry => entry.category))];
  const categoryText = categories.join(', ');
  const name = $('customerName').value.trim() || 'Customer / Company Name';
  const address = $('customerAddress').value.trim() || 'Customer address will appear here';
  const mobile = $('customerMobile').value.trim() || '—';
  const validity = $('validity').value;

  $('outQuotationNo').textContent = $('quotationNo').value.trim() || makeQuotationNumber();
  $('outDate').textContent = prettyDate($('quotationDate').value);
  $('outName').textContent = name;
  $('outMobile').textContent = mobile;
  $('outAddress').textContent = address;
  $('outCategory').textContent = categoryText;
  $('bannerService').textContent = categoryText;
  $('outServiceItems').replaceChildren(...entries.map((entry, index) => {
    const row = document.createElement('tr');
    row.className = 'item-row';

    const serial = document.createElement('td');
    serial.className = 'center';
    serial.textContent = String(index + 1);

    const details = document.createElement('td');
    const category = document.createElement('span');
    category.className = 'service-category';
    category.textContent = entry.category;
    const title = document.createElement('strong');
    title.textContent = entry.title;
    const description = document.createElement('p');
    description.textContent = entry.description;
    details.append(category, title, description);

    const quantity = document.createElement('td');
    quantity.className = 'center';
    quantity.textContent = `${entry.qty} ${entry.qty === 1 ? 'Unit / Project' : 'Units'}`;

    const amount = document.createElement('td');
    amount.className = 'money';
    amount.textContent = formatINR(entry.total);

    row.append(serial, details, quantity, amount);
    return row;
  }));
  $('outSubtotal').textContent = formatINR(total);
  $('outTotal').textContent = formatINR(total);
  $('outValidity').textContent = validity;
  $('outValidityTerms').textContent = validity;
  $('outNotes').textContent = $('notes').value.trim() || 'We look forward to working with you and bringing your ideas to life.';
}
function setDefaults() {
  const now = new Date();
  $('quotationDate').value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  $('quotationNo').value = makeQuotationNumber();
  $('customerName').value = '';
  $('customerAddress').value = '';
  $('customerMobile').value = '';
  $('serviceEntries').replaceChildren();
  const firstService = addService();
  firstService.querySelector('.service-type').value = 'Website Development';
  firstService.querySelector('.service-title').value = '';
  firstService.querySelector('.service-description').value = '';
  firstService.querySelector('.service-quantity').value = 1;
  firstService.querySelector('.service-amount').value = 12000;
  $('validity').value = '15 Days';
  $('notes').value = '';
  updateQuotation();
}
const quotationForm = $('quotationForm');
quotationForm.addEventListener('input', updateQuotation);
quotationForm.addEventListener('change', updateQuotation);
$('addServiceBtn').addEventListener('click', () => {
  addService();
  updateQuotation();
});
$('serviceEntries').addEventListener('click', event => {
  if (!event.target.classList.contains('remove-service')) return;
  event.target.closest('.service-entry').remove();
  updateServiceEntryHeadings();
  updateQuotation();
});
$('printBtn').addEventListener('click', () => { updateQuotation(); window.print(); });
$('resetBtn').addEventListener('click', setDefaults);
setDefaults();
