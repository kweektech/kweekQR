import { useState, useRef, useEffect, ChangeEvent } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { jsPDF } from 'jspdf';
import {
  Globe, FileText, File, Image, User, Video, Download, Copy, RotateCcw, Share2, Printer,
  Wifi, Mail, Smartphone, Briefcase, UtensilsCrossed, Tag, Package, Music, LinkIcon, Heart, Zap,
  Calendar
} from 'lucide-react';

type ContentType = 'website' | 'text' | 'pdf' | 'images' | 'vcard' | 'video' | 'wifi' | 'email' 
  | 'whatsapp' | 'sms' | 'business' | 'menu' | 'coupon' | 'product' | 'app' | 'mp3' | 'landing' 
  | 'event' | 'feedback' | 'playlist' | 'link-list' | 'vcard-plus' | 'social';

interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  jobTitle: string;
  website: string;
  address: string;
}

interface WiFiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
}

interface LinkItem {
  title: string;
  url: string;
}

const QR_TYPES = [
  { id: 'website', name: 'Website', icon: Globe, color: '#3B82F6' },
  { id: 'text', name: 'Text', icon: FileText, color: '#8B5CF6' },
  { id: 'pdf', name: 'PDF', icon: File, color: '#F59E0B' },
  { id: 'images', name: 'Images', icon: Image, color: '#EC4899' },
  { id: 'vcard', name: 'vCard', icon: User, color: '#10B981' },
  { id: 'video', name: 'Video', icon: Video, color: '#EF4444' },
  { id: 'wifi', name: 'Wi-Fi', icon: Wifi, color: '#06B6D4' },
  { id: 'email', name: 'Email', icon: Mail, color: '#F97316' },
  { id: 'whatsapp', name: 'WhatsApp', icon: Smartphone, color: '#25D366' },
  { id: 'sms', name: 'SMS', icon: Smartphone, color: '#3B82F6' },
  { id: 'business', name: 'Business', icon: Briefcase, color: '#6366F1' },
  { id: 'menu', name: 'Menu', icon: UtensilsCrossed, color: '#F59E0B' },
  { id: 'coupon', name: 'Coupon', icon: Tag, color: '#EC4899' },
  { id: 'product', name: 'Product', icon: Package, color: '#14B8A6' },
  { id: 'app', name: 'App', icon: Download, color: '#8B5CF6' },
  { id: 'mp3', name: 'MP3', icon: Music, color: '#F43F5E' },
  { id: 'landing', name: 'Landing', icon: Zap, color: '#FBBF24' },
  { id: 'event', name: 'Event', icon: Calendar, color: '#06B6D4' },
  { id: 'feedback', name: 'Feedback', icon: Heart, color: '#EF4444' },
  { id: 'playlist', name: 'Playlist', icon: Music, color: '#8B5CF6' },
  { id: 'link-list', name: 'Links', icon: LinkIcon, color: '#3B82F6' },
  { id: 'vcard-plus', name: 'vCard+', icon: User, color: '#10B981' },
  { id: 'social', name: 'Social', icon: Share2, color: '#06B6D4' },
];

const SHAPE_STYLES = ['square', 'rounded1', 'rounded2', 'rounded3', 'rounded4', 'dots'];

export function QRGenerator() {
  // Content states
  const [contentType, setContentType] = useState<ContentType>('website');
  const [url, setUrl] = useState('https://www.google.com');
  const [text, setText] = useState('Bienvenue sur mon QR Code!');
  const [vcard, setVcard] = useState<VCardData>({
    firstName: 'John', lastName: 'Doe', phone: '+1234567890',
    email: 'john@example.com', company: 'Company', jobTitle: 'Developer',
    website: 'https://example.com', address: '123 Street, City'
  });
  const [wifi, setWifi] = useState<WiFiData>({ ssid: 'WiFi Name', password: 'Password123', security: 'WPA' });
  const [emailTo, setEmailTo] = useState('recipient@example.com');
  const [emailSubject, setEmailSubject] = useState('Subject');
  const [emailBody, setEmailBody] = useState('Message body');
  const [whatsappNumber, setWhatsappNumber] = useState('+1234567890');
  const [whatsappMessage, setWhatsappMessage] = useState('Hello!');
  const [smsNumber, setSmsNumber] = useState('+1234567890');
  const [smsMessage, setSmsMessage] = useState('Hello!');
  const [businessName, setBusinessName] = useState('Company Name');
  const [businessDesc, setBusinessDesc] = useState('Description');
  const [menuTitle, setMenuTitle] = useState('Menu');
  const [menuDesc, setMenuDesc] = useState('Cafe Menu');
  const [couponCode, setCouponCode] = useState('DISCOUNT2024');
  const [couponDiscount, setCouponDiscount] = useState('20%');
  const [eventTitle, setEventTitle] = useState('Conférence Tech 2026');
  const [eventDesc, setEventDesc] = useState('Rejoignez-nous pour une conférence exclusive');
  const [linkItems, setLinkItems] = useState<LinkItem[]>([
    { title: 'Website', url: 'https://www.google.com' },
    { title: 'Twitter', url: 'https://twitter.com' },
    { title: 'LinkedIn', url: 'https://linkedin.com' }
  ]);
  const [socialUrls, setSocialUrls] = useState({ facebook: '', twitter: '', instagram: '' });

  // Design states
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [shapeStyle, setShapeStyle] = useState('square');
  const [errorLevel, setErrorLevel] = useState('M');
  const [hasLogo, setHasLogo] = useState(false);
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [originalLogoFile, setOriginalLogoFile] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(25);
  const [logoMargin, setLogoMargin] = useState(5);
  const [hasTransparentBg, setHasTransparentBg] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [frameStyle, setFrameStyle] = useState('none');
  const [frameText, setFrameText] = useState('SCAN ME');
  const [isGradient, setIsGradient] = useState(false);
  const [gradientColor, setGradientColor] = useState('#FF6B6B');

  // UI states
  const [copyStatus, setCopyStatus] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);

  // Generate QR value based on content type
  const getQRValue = (): string => {
    switch (contentType) {
      case 'website': return url || 'https://www.google.com';
      case 'text': return text || 'Bienvenue sur mon QR Code';
      case 'pdf': return url || 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/pdf-table.pdf';
      case 'images': return url || 'https://www.w3schools.com/css/img_5terre.jpg';
      case 'vcard':
      case 'vcard-plus': return generateVCardString(vcard);
      case 'video': return url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      case 'wifi': return generateWiFiString(wifi);
      case 'email': return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'whatsapp': return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
      case 'sms': return `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;
      case 'business': return `${businessName}\n${businessDesc}`;
      case 'menu': return `${menuTitle}\n${menuDesc}`;
      case 'coupon': return `Coupon: ${couponCode} - ${couponDiscount} OFF`;
      case 'product': return url || 'https://www.amazon.com';
      case 'app': return url || 'https://www.google.com/play';
      case 'mp3': return url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      case 'landing': return url || 'https://www.google.com';
      case 'event': return `EVENT\n${eventTitle}\n${eventDesc}`;
      case 'feedback': return url || 'https://forms.google.com';
      case 'playlist': return url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      case 'link-list': return linkItems.map((l) => `${l.title}: ${l.url}`).join('\n');
      case 'social': return `Facebook: ${socialUrls.facebook}\nTwitter: ${socialUrls.twitter}\nInstagram: ${socialUrls.instagram}`;
      default: return 'https://www.google.com';
    }
  };

  const generateVCardString = (data: VCardData): string => {
    return `BEGIN:VCARD\nVERSION:3.0\nFN:${data.firstName} ${data.lastName}\nTEL:${data.phone}\nEMAIL:${data.email}\nORG:${data.company}\nTITLE:${data.jobTitle}\nURL:${data.website}\nADR:${data.address}\nEND:VCARD`;
  };

  const generateWiFiString = (data: WiFiData): string => {
    const sec = data.security.toUpperCase();
    return `WIFI:T:${sec};S:${data.ssid};P:${data.password};;`;
  };

  // Render QR Code
  useEffect(() => {
    if (!qrContainerRef.current) return;

    // Determine module type and corner style based on shape style
    let moduleType: 'square' | 'dots' = 'square';
    let cornersType: 'square' | 'rounded' | 'extra-rounded' = 'square';
    let cornersDotType: 'square' | 'dot' = 'dot';

    switch (shapeStyle) {
      case 'square':
        moduleType = 'square';
        cornersType = 'square';
        cornersDotType = 'square';
        break;
      case 'rounded1':
        moduleType = 'square';
        cornersType = 'rounded';
        cornersDotType = 'dot';
        break;
      case 'rounded2':
        moduleType = 'square';
        cornersType = 'extra-rounded';
        cornersDotType = 'dot';
        break;
      case 'rounded3':
        moduleType = 'dots';
        cornersType = 'rounded';
        cornersDotType = 'dot';
        break;
      case 'rounded4':
        moduleType = 'dots';
        cornersType = 'extra-rounded';
        cornersDotType = 'dot';
        break;
      case 'dots':
        moduleType = 'dots';
        cornersType = 'square';
        cornersDotType = 'square';
        break;
    }

    const qrCode = new QRCodeStyling({
      width: 250,
      height: 250,
      data: getQRValue(),
      dotsOptions: {
        color: isGradient ? gradientColor : qrColor,
        type: moduleType as 'square' | 'dots',
      },
      cornersSquareOptions: {
        color: isGradient ? gradientColor : qrColor,
        type: cornersType as 'square' | 'rounded' | 'extra-rounded',
      },
      cornersDotOptions: {
        color: isGradient ? gradientColor : qrColor,
        type: cornersDotType as 'square' | 'dot',
      },
      backgroundOptions: {
        color: hasTransparentBg ? 'transparent' : bgColor,
      },
      image: hasLogo && logoFile ? logoFile : undefined,
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: logoMargin,
        hideBackgroundDots: false,
        imageSize: Math.min(3.0, (logoSize / 100)),
      },
      margin: 8,
      qrOptions: {
        errorCorrectionLevel: errorLevel as 'L' | 'M' | 'Q' | 'H',
      },
    } as any);

    qrContainerRef.current.innerHTML = '';
    qrCode.append(qrContainerRef.current);
    qrCodeInstance.current = qrCode; // Store instance for downloads
    }, [url, text, qrColor, bgColor, shapeStyle, errorLevel, contentType, vcard, wifi, emailTo, 
      emailSubject, emailBody, whatsappNumber, whatsappMessage, smsNumber, smsMessage, 
      businessName, businessDesc, menuTitle, menuDesc, couponCode, couponDiscount, 
      eventTitle, eventDesc, linkItems, socialUrls, hasTransparentBg, hasLogo, logoFile, logoSize, logoMargin, isGradient, gradientColor, frameStyle]);

  // Download QR
  const downloadQR = async () => {
    try {
      setIsDownloading(true);
      
      if (downloadFormat === 'svg') {
        // Use QRCodeStyling's built-in SVG download
        if (qrCodeInstance.current) {
          await qrCodeInstance.current.download({
            name: `qr-code-${Date.now()}`,
            extension: 'svg'
          });
        }
      } else {
        const canvas = qrContainerRef.current?.querySelector('canvas') as HTMLCanvasElement;
        if (!canvas) {
          alert('QR code not ready yet');
          return;
        }

        const link = document.createElement('a');
        const filename = `qr-code-${Date.now()}`;
        
        if (downloadFormat === 'png') {
          link.href = canvas.toDataURL('image/png');
          link.download = `${filename}.png`;
        } else if (downloadFormat === 'pdf') {
          // Create PDF with QR code image
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = 100;
          const imgHeight = 100;
          const x = (pageWidth - imgWidth) / 2;
          const y = (pageHeight - imgHeight) / 2;
          pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
          link.href = pdf.output('dataurlstring');
          link.download = `${filename}.pdf`;
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading QR code');
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy QR
  const copyQR = async () => {
    try {
      const canvas = qrContainerRef.current?.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) {
        alert('QR code not ready yet');
        return;
      }

      canvas.toBlob((blob) => {
        if (blob) {
          navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopyStatus(true);
          setTimeout(() => setCopyStatus(false), 2000);
        }
      });
    } catch (error) {
      console.error('Copy error:', error);
      alert('Error copying to clipboard');
    }
  };

  const resetAll = () => {
    setUrl('https://www.google.com');
    setText('Bienvenue sur mon QR Code!');
    setQrColor('#000000');
    setBgColor('#ffffff');
    setShapeStyle('square');
    setErrorLevel('M');
    setHasTransparentBg(false);
    setHasLogo(false);
    setLogoFile(null);
    setOriginalLogoFile(null);
    setLogoSize(25);
    setLogoMargin(5);
    setFrameStyle('none');
    setFrameText('SCAN ME');
    setIsGradient(false);
    setCopyStatus(false);
  };

  // Share QR - Download the QR code
  const shareQR = async () => {
    try {
      const canvas = qrContainerRef.current?.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) {
        alert('QR code not ready yet');
        return;
      }

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          alert('Failed to generate QR code image');
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `qr-code-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Share error:', error);
      alert('Failed to download QR code');
    }
  };

  // Save as template
  const saveTemplate = () => {
    try {
      const template = {
        contentType,
        data: {
          url, text, vcard, wifi, emailTo, emailSubject, emailBody,
          whatsappNumber, whatsappMessage, smsNumber, smsMessage,
          businessName, businessDesc, menuTitle, menuDesc,
          couponCode, couponDiscount, eventTitle, eventDesc,
          linkItems, socialUrls
        },
        design: {
          qrColor, bgColor, shapeStyle,
          errorLevel, hasLogo, logoSize, hasTransparentBg, isGradient, gradientColor,
          frameStyle, frameText, downloadFormat
        }
      };
      const json = JSON.stringify(template, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `qr-template-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Template save error:', error);
      alert('Error saving template');
    }
  };

  // Create dynamic QR
  const createDynamicQR = () => {
    try {
      alert('Dynamic QR feature will allow you to track scans and update content. Coming soon!');
    } catch (error) {
      console.error('Dynamic QR error:', error);
    }
  };

  // Print QR
  const printQR = () => {
    try {
      const canvas = qrContainerRef.current?.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) {
        alert('QR code not ready yet');
        return;
      }

      const printWindow = window.open('', '', 'height=600,width=600');
      if (printWindow) {
        const img = canvas.toDataURL('image/png');
        printWindow.document.write(`
          <html>
            <head><title>Print QR Code</title></head>
            <body style="display:flex;align-items:center;justify-content:center;height:100vh;">
              <img src="${img}" style="width:400px;height:400px;"/>
            </body>
          </html>
        `);
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 250);
      }
    } catch (error) {
      console.error('Print error:', error);
      alert('Error printing QR code');
    }
  };

  // Resize logo image based on percentage
  const resizeLogoImage = (srcDataUrl: string, sizePercent: number): Promise<string> => {
    return new Promise((resolve) => {
      try {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // Calculate target size: scale up to 200x200 at 100%, and proportionally for other percentages
          const targetSize = Math.round((sizePercent / 100) * 300);
          const canvas = document.createElement('canvas');
          canvas.width = targetSize;
          canvas.height = targetSize;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(srcDataUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, targetSize, targetSize);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => resolve(srcDataUrl);
        img.src = srcDataUrl;
      } catch (err) {
        resolve(srcDataUrl);
      }
    });
  };

  // Handle logo upload
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setOriginalLogoFile(dataUrl);
        resizeLogoImage(dataUrl, logoSize).then((resized) => {
          setLogoFile(resized);
          setHasLogo(true);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Reprocess logo when size changes
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (hasLogo && originalLogoFile) {
        const resized = await resizeLogoImage(originalLogoFile, logoSize);
        if (!cancelled) setLogoFile(resized);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [logoSize, originalLogoFile, hasLogo]);

  // Render content form based on type
  const renderContentForm = () => {
    switch (contentType) {
      case 'website':
      case 'pdf':
      case 'images':
      case 'video':
      case 'app':
      case 'mp3':
      case 'landing':
      case 'feedback':
      case 'playlist':
      case 'product':
        return (
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Entrez l'URL..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'text':
        return (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        );
      case 'wifi':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={wifi.ssid}
              onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
              placeholder="Network name (SSID)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              value={wifi.password}
              onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
              placeholder="Password..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={wifi.security}
              onChange={(e) => setWifi({ ...wifi, security: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="WPA">WPA</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
        );
      case 'email':
        return (
          <div className="space-y-2">
            <input
              type="email"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              placeholder="To email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Subject..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Message body..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>
        );
      case 'whatsapp':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="Phone number (+1234567890)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              placeholder="Message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>
        );
      case 'sms':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={smsNumber}
              onChange={(e) => setSmsNumber(e.target.value)}
              placeholder="Phone number..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder="Message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>
        );
      case 'vcard':
      case 'vcard-plus':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={vcard.firstName}
                onChange={(e) => setVcard({ ...vcard, firstName: e.target.value })}
                placeholder="First name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                value={vcard.lastName}
                onChange={(e) => setVcard({ ...vcard, lastName: e.target.value })}
                placeholder="Last name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <input
              type="email"
              value={vcard.email}
              onChange={(e) => setVcard({ ...vcard, email: e.target.value })}
              placeholder="Email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              value={vcard.phone}
              onChange={(e) => setVcard({ ...vcard, phone: e.target.value })}
              placeholder="Phone..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              value={vcard.company}
              onChange={(e) => setVcard({ ...vcard, company: e.target.value })}
              placeholder="Company..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              value={vcard.jobTitle}
              onChange={(e) => setVcard({ ...vcard, jobTitle: e.target.value })}
              placeholder="Job title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        );
      case 'coupon':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon code..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={couponDiscount}
              onChange={(e) => setCouponDiscount(e.target.value)}
              placeholder="Discount (e.g., 20%, $5)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        );
      case 'event':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Event title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
              placeholder="Event description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>
        );
      case 'social':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={socialUrls.facebook}
              onChange={(e) => setSocialUrls({ ...socialUrls, facebook: e.target.value })}
              placeholder="Facebook URL..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              value={socialUrls.twitter}
              onChange={(e) => setSocialUrls({ ...socialUrls, twitter: e.target.value })}
              placeholder="Twitter URL..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              value={socialUrls.instagram}
              onChange={(e) => setSocialUrls({ ...socialUrls, instagram: e.target.value })}
              placeholder="Instagram URL..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        );
      default:
        return <input type="text" placeholder="Enter content..." className="w-full px-3 py-2 border border-gray-300 rounded-lg" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Header with Logo */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="KweekQR Logo" className="w-10 h-10" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="text-white">Kweek</span>
                  <span className="text-orange-300">QR</span>
                </h1>
                <p className="text-xs text-blue-100">Générateur de QR Code Professionnel</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">✨ Gratuit</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🚀 Illimité</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🔒 Sans inscription</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Types Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
            {QR_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id as ContentType)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition text-sm font-medium ${
                    contentType === type.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {type.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Content */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                <h2 className="font-bold text-gray-900">Complete the content</h2>
              </div>
              {renderContentForm()}
              
              {/* QR Code Preview - shows what will be encoded */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-800 mb-1">📱 Contenu encodé dans le QR:</p>
                <p className="text-xs text-blue-700 break-all font-mono bg-white p-2 rounded border">
                  {getQRValue()}
                </p>
              </div>
            </div>
          </div>

          {/* Middle - Design */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                  <h2 className="font-bold text-gray-900">Design your QR</h2>
                </div>

                {/* Colors */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-2">QR Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-2">Background Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Shape */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Shape Style</label>
                  <div className="flex flex-wrap gap-2">
                    {SHAPE_STYLES.map((style) => {
                      const getShapePreview = () => {
                        switch (style) {
                          case 'square':
                            return (
                              <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                <rect x="2" y="2" width="16" height="16" />
                              </svg>
                            );
                          case 'rounded1':
                            return (
                              <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                <rect x="2" y="2" width="16" height="16" rx="3" ry="3" />
                              </svg>
                            );
                          case 'rounded2':
                            return (
                              <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                <rect x="2" y="2" width="16" height="16" rx="6" ry="6" />
                              </svg>
                            );
                          case 'rounded3':
                            return (
                              <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                <circle cx="4" cy="4" r="1.5" />
                                <circle cx="10" cy="4" r="1.5" />
                                <circle cx="16" cy="4" r="1.5" />
                                <circle cx="4" cy="10" r="1.5" />
                                <circle cx="10" cy="10" r="1.5" />
                                <circle cx="16" cy="10" r="1.5" />
                                <circle cx="4" cy="16" r="1.5" />
                                <circle cx="10" cy="16" r="1.5" />
                                <circle cx="16" cy="16" r="1.5" />
                              </svg>
                            );
                          case 'rounded4':
                            return (
                              <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                <circle cx="4" cy="4" r="2" />
                                <circle cx="10" cy="4" r="2" />
                                <circle cx="16" cy="4" r="2" />
                                <circle cx="4" cy="10" r="2" />
                                <circle cx="10" cy="10" r="2" />
                                <circle cx="16" cy="10" r="2" />
                                <circle cx="4" cy="16" r="2" />
                                <circle cx="10" cy="16" r="2" />
                                <circle cx="16" cy="16" r="2" />
                              </svg>
                            );
                          case 'dots':
                            return (
                              <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                <circle cx="5" cy="5" r="1.8" />
                                <circle cx="10" cy="5" r="1.8" />
                                <circle cx="15" cy="5" r="1.8" />
                                <circle cx="5" cy="10" r="1.8" />
                                <circle cx="10" cy="10" r="1.8" />
                                <circle cx="15" cy="10" r="1.8" />
                                <circle cx="5" cy="15" r="1.8" />
                                <circle cx="10" cy="15" r="1.8" />
                                <circle cx="15" cy="15" r="1.8" />
                              </svg>
                            );
                          default:
                            return null;
                        }
                      };

                      return (
                        <button
                          key={style}
                          onClick={() => setShapeStyle(style)}
                          className={`w-10 h-10 flex items-center justify-center border-2 rounded transition text-gray-900 ${
                            shapeStyle === style
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 bg-white hover:border-gray-400'
                          }`}
                          title={style}
                        >
                          {getShapePreview()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Error Level */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Error Correction Level</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['L', 'M', 'Q', 'H'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setErrorLevel(level)}
                        className={`px-3 py-2 rounded transition ${
                          errorLevel === level
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transparent BG */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasTransparentBg}
                    onChange={(e) => setHasTransparentBg(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Transparent background</span>
                </label>

                {/* Logo Section */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Add Logo</h3>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={hasLogo}
                      onChange={(e) => setHasLogo(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Add logo to QR</span>
                  </label>
                  {hasLogo && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded mb-3"
                      />
                      
                      {logoFile && (
                        <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-600 mb-2">Aperçu du logo:</p>
                          <img 
                            src={logoFile} 
                            alt="Logo preview" 
                            className="w-16 h-16 object-contain mx-auto"
                          />
                        </div>
                      )}

                      <div className="mt-2">
                        <label className="text-xs font-semibold text-gray-700 block mb-2">Taille du logo: {logoSize}%</label>
                        <input
                          type="range"
                          min="1"
                          max="300"
                          value={logoSize}
                          onChange={(e) => setLogoSize(parseInt(e.target.value))}
                          className="w-full"
                        />
                        <div className="mt-2 flex gap-2 items-center">
                          <input
                            type="number"
                            min="1"
                            max="300"
                            value={logoSize}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '') return;
                              const num = parseInt(val, 10);
                              if (!isNaN(num) && num >= 1 && num <= 300) {
                                setLogoSize(num);
                              }
                            }}
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                          <span className="text-xs text-gray-600">%</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="text-xs font-semibold text-gray-700 block mb-2">Espacement: {logoMargin}px</label>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={logoMargin}
                          onChange={(e) => setLogoMargin(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <button
                        onClick={() => {
                          setHasLogo(false);
                          setLogoFile(null);
                          setOriginalLogoFile(null);
                          setLogoSize(25);
                          setLogoMargin(5);
                        }}
                        className="w-full mt-3 px-3 py-2 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition font-medium"
                      >
                        Supprimer le logo
                      </button>
                    </>
                  )}
                </div>

                {/* Frame Section */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Frame Design</h3>
                  
                  {/* Frame icons grid */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <button
                      onClick={() => setFrameStyle('none')}
                      className={`p-3 border-2 rounded-lg flex items-center justify-center transition ${
                        frameStyle === 'none' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title="No Frame"
                    >
                      <div className="w-8 h-8 border-2 border-gray-400 rounded relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-0.5 bg-gray-400 rotate-45"></div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setFrameStyle('envelope')}
                      className={`p-3 border-2 rounded-lg flex items-center justify-center transition ${
                        frameStyle === 'envelope' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title="Envelope"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setFrameStyle('screen')}
                      className={`p-3 border-2 rounded-lg flex items-center justify-center transition ${
                        frameStyle === 'screen' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title="Screen"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setFrameStyle('hand')}
                      className={`p-3 border-2 rounded-lg flex items-center justify-center transition ${
                        frameStyle === 'hand' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title="Hand"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setFrameStyle('laptop')}
                      className={`p-3 border-2 rounded-lg flex items-center justify-center transition ${
                        frameStyle === 'laptop' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title="Laptop"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="12" rx="1" />
                        <path d="M2 16h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setFrameStyle('mug')}
                      className={`p-3 border-2 rounded-lg flex items-center justify-center transition ${
                        frameStyle === 'mug' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title="Mug"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
                        <rect x="5" y="6" width="12" height="12" rx="1" />
                        <path d="M5 18v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setFrameStyle('scooter')}
                      className={`p-3 border-2 rounded-lg flex items-center justify-center transition ${
                        frameStyle === 'scooter' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title="Delivery"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="8" cy="19" r="2" />
                        <circle cx="18" cy="19" r="2" />
                        <path d="M10.5 19H7V6a1 1 0 0 1 1-1h6m4 0h2v6m0 0h-2m2 0l1.5 3" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setFrameStyle('banner')}
                      className={`p-3 border-2 rounded-lg flex items-center justify-center transition ${
                        frameStyle === 'banner' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title="Banner"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="4" y="16" width="16" height="4" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                  
                  {frameStyle !== 'none' && (
                    <input
                      type="text"
                      value={frameText}
                      onChange={(e) => setFrameText(e.target.value)}
                      placeholder="Frame text..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                    />
                  )}
                </div>

                {/* Gradient Section */}
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={isGradient}
                    onChange={(e) => setIsGradient(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Gradient QR</span>
                </label>
                {isGradient && (
                  <div className="mt-2">
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Gradient Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={gradientColor}
                        onChange={(e) => setGradientColor(e.target.value)}
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={gradientColor}
                        onChange={(e) => setGradientColor(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Download */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-24 space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                <h2 className="font-bold text-gray-900">Download your QR</h2>
              </div>

              {/* QR Preview */}
              <div className="flex justify-center">
                {/* QR Code component that will be wrapped by frames */}
                <div className="relative">
                  {frameStyle === 'none' && (
                    <div className={`border-2 border-gray-200 rounded-lg p-2 ${hasTransparentBg ? 'bg-transparent' : 'bg-gray-50'}`}>
                      <div ref={qrContainerRef} />
                    </div>
                  )}
                  
                  {frameStyle === 'envelope' && (
                    <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[60px] border-r-[60px] border-t-[40px] border-l-transparent border-r-transparent border-t-gray-300"></div>
                      <div className="inline-block p-3 bg-white rounded-lg mt-6">
                        <div ref={qrContainerRef} />
                      </div>
                      <div className="text-center text-gray-700 font-semibold text-xs mt-2">{frameText || 'SCAN ME'}</div>
                    </div>
                  )}
                  
                  {frameStyle === 'screen' && (
                    <div className="bg-gray-800 p-4 rounded-2xl shadow-2xl">
                      <div className="bg-white p-2 rounded-lg">
                        <div ref={qrContainerRef} />
                      </div>
                      <div className="h-2 bg-gray-700 rounded-b-lg mt-2"></div>
                      <div className="flex justify-center mt-2">
                        <div className="w-16 h-1 bg-gray-600 rounded"></div>
                      </div>
                      <div className="text-center text-white text-xs mt-2 font-medium">{frameText || 'SCAN ME'}</div>
                    </div>
                  )}
                  
                  {frameStyle === 'hand' && (
                    <div className="relative pb-8">
                      <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-gray-200">
                        <div ref={qrContainerRef} />
                        <div className="text-center text-gray-900 font-bold text-xs mt-2">{frameText || 'SCAN ME'}</div>
                      </div>
                      <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-16 text-gray-700" viewBox="0 0 100 50" fill="currentColor">
                        <path d="M20,40 Q30,35 40,38 Q50,41 60,38 Q70,35 80,40 L85,45 Q70,48 50,45 Q30,48 15,45 Z" />
                        <ellipse cx="25" cy="42" rx="8" ry="6" opacity="0.3" />
                        <ellipse cx="50" cy="43" rx="10" ry="7" opacity="0.3" />
                        <ellipse cx="75" cy="42" rx="8" ry="6" opacity="0.3" />
                      </svg>
                    </div>
                  )}
                  
                  {frameStyle === 'laptop' && (
                    <div className="bg-gray-300 p-2 rounded-t-2xl shadow-xl">
                      <div className="bg-gray-900 p-3 rounded-t-xl">
                        <div className="bg-white p-2 rounded">
                          <div ref={qrContainerRef} />
                        </div>
                      </div>
                      <div className="h-3 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-xl"></div>
                      <div className="text-center text-gray-800 font-bold text-xs mt-1">{frameText || 'SCAN ME'}</div>
                    </div>
                  )}
                  
                  {frameStyle === 'mug' && (
                    <div className="relative">
                      <div className="bg-gradient-to-br from-red-500 to-red-700 p-4 rounded-2xl shadow-xl relative">
                        <div className="absolute -right-3 top-8 w-8 h-12 border-4 border-red-600 rounded-r-full"></div>
                        <div className="bg-white p-2 rounded-lg">
                          <div ref={qrContainerRef} />
                        </div>
                        <div className="h-2 bg-red-800 rounded-b-lg mt-1"></div>
                      </div>
                      <div className="text-center text-gray-900 font-bold text-xs mt-2">{frameText || 'SCAN ME'}</div>
                    </div>
                  )}
                  
                  {frameStyle === 'scooter' && (
                    <div className="relative">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-2xl shadow-xl">
                        <div className="bg-white p-2 rounded-lg">
                          <div ref={qrContainerRef} />
                        </div>
                        <div className="text-center text-white font-bold text-xs mt-2">{frameText || 'DELIVERY'}</div>
                      </div>
                      <div className="absolute -bottom-3 -right-3">
                        <svg className="w-16 h-16 text-gray-800" viewBox="0 0 50 50" fill="currentColor">
                          <circle cx="15" cy="40" r="6" />
                          <circle cx="35" cy="40" r="6" />
                          <path d="M21,40 L29,40 M15,34 L15,20 L25,20 M25,20 L35,25 L35,34" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {frameStyle === 'banner' && (
                    <div className="bg-white border-4 border-gray-900 rounded-lg overflow-hidden shadow-xl">
                      <div className="p-4 bg-white">
                        <div ref={qrContainerRef} />
                      </div>
                      <div className="bg-gray-900 text-white py-3 px-4 text-center font-bold text-sm">
                        {frameText || 'Scan me!'}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Format selector */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Format</label>
                <select
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="png">PNG</option>
                  <option value="pdf">PDF</option>
                  <option value="svg">SVG</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <button
                  onClick={downloadQR}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                >
                  <Download size={18} />
                  {isDownloading ? 'Downloading...' : 'Download QR'}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={copyQR}
                    className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition font-medium text-sm ${
                      copyStatus
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Copy size={16} />
                    {copyStatus ? 'Copied!' : 'Copy'}
                  </button>

                  <button
                    onClick={resetAll}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={shareQR}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                  >
                    <Share2 size={16} />
                    Share
                  </button>

                  <button
                    onClick={printQR}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                  >
                    <Printer size={16} />
                    Print
                  </button>
                </div>

                {/* More actions */}
                <button 
                  onClick={saveTemplate}
                  className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                >
                  Save as Template
                </button>

                <button 
                  onClick={createDynamicQR}
                  className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                >
                  Create Dynamic QR
                </button>
              </div>

              {/* Stats */}
              <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-600">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="font-bold text-gray-900">23</div>
                    <div>Types</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">∞</div>
                    <div>Free</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">✓</div>
                    <div>No Sign-up</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
