import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { chatbotId } = params;

    const host = request.headers.get('host');
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const scriptContent = `
(function() {
  const chatbotId = "${chatbotId}";
  const baseUrl = "${baseUrl}";
  
  // Create iframe container
  const container = document.createElement('div');
  container.id = 'supportai-widget-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.width = '100px'; // Initial closed size
  container.style.height = '100px';
  container.style.maxWidth = '100vw';
  container.style.maxHeight = '100vh';
  container.style.zIndex = '999999';
  container.style.pointerEvents = 'none'; // Background clicks pass through when closed
  container.style.transition = 'all 0.3s ease';

  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = \`\${baseUrl}/chat/\${chatbotId}\`;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.backgroundColor = 'transparent';
  iframe.style.pointerEvents = 'auto'; // allow clicks inside iframe
  iframe.allowTransparency = 'true';

  container.appendChild(iframe);
  document.body.appendChild(container);

  // Listen for resize messages from iframe
  window.addEventListener('message', function(event) {
    if (event.origin !== baseUrl) return;
    
    if (event.data.type === 'CHATBOT_RESIZE') {
      if (event.data.isOpen) {
        container.style.height = '600px';
        container.style.width = '420px';
      } else {
        container.style.height = '100px';
        container.style.width = '100px';
      }
    }
  });
})();
  `;

    return new NextResponse(scriptContent, {
        headers: {
            'Content-Type': 'application/javascript',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
