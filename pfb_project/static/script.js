async function submitForm(event) {
    event.preventDefault();
    const namespaceId = document.getElementById('namespace_id').value;
    const data = document.getElementById('data').value;

    if (!validateNamespaceId(namespaceId)) {
        alert('Namespace ID should be 8 bytes long.');
        return;
    }

    document.getElementById('processing').style.display = 'block';
    const response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            namespace_id: namespaceId,
            data: data
        })
    });
    const output = await response.text();
    document.getElementById('output').innerText = output;
    document.getElementById('processing').style.display = 'none';
    document.getElementById('output-container').style.display = 'block';

    // Extract and display txhash value
    const jsonResponse = JSON.parse(output);
    updateTxhash(jsonResponse.txhash);
}

function updateTxhash(txhash) {
    const viewTransactionLink = document.getElementById('view-transaction');
    viewTransactionLink.href = `https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${txhash}`;
    document.getElementById('txhash').innerText = txhash;
}

function copyOutput() {
    const output = document.getElementById('output');
    const textArea = document.createElement('textarea');
    textArea.value = output.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

function validateNamespaceId(namespaceId) {
    const regex = /^[a-zA-Z0-9]+$/; // Regular expression for alphanumeric characters
    return namespaceId.length === 16 && regex.test(namespaceId);
}

