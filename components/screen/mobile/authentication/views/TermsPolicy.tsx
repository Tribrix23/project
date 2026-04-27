'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp, Shield, FileText, Users, ShoppingCart, AlertTriangle, Package, CreditCard, MapPin } from 'lucide-react'

type TermsPolicyProps = {
  onAgree?: () => void
  onGoBack?: () => void
}

const TermsPolicy = ({ onAgree, onGoBack }: TermsPolicyProps) => {
  const [agreed, setAgreed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<number[]>([0])
  const contentRef = useRef<HTMLDivElement>(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current
        const isScrolledNearBottom = scrollHeight - scrollTop - clientHeight < 100
        setShowButton(isScrolledNearBottom)
      }
    }

    const content = contentRef.current
    if (content) {
      content.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      if (content) {
        content.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const termsSections = [
    {
      title: 'Terms of Service',
      icon: FileText,
      content: `Welcome to Constructo! By accessing and using our platform, you agree to be bound by these Terms of Service.

1. ACCEPTANCE OF TERMS
By accessing Constructo.ph, you confirm that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, please do not use our service.

2. PLATFORM DESCRIPTION
Constructo is an e-commerce platform connecting buyers with sellers of construction materials, tools, hardware, and building supplies in the Philippines. We act as a marketplace facilitator and do not sell products directly unless otherwise stated.

3. USER REGISTRATION
• You must provide accurate and complete information
• You must be at least 18 years old or have guardian consent
• You are responsible for maintaining account security
• One account per person/business entity

4. PRODUCT LISTINGS
Sellers are responsible for:
• Accurate product descriptions and specifications
• Clear pricing including all applicable taxes
• Stock availability status
• Proper product categorization
• Compliance with Philippine import regulations`
    },
    {
      title: 'Privacy Policy (Data Privacy Act 2012)',
      icon: Shield,
      content: `Your privacy is important to us. This policy complies with the Data Privacy Act of 2012 (R.A. 10173).

1. INFORMATION WE COLLECT
• Personal Information: Name, email, phone, shipping address
• Account Data: Username, password (encrypted)
• Transaction Data: Order history, payment records
• Technical Data: IP address, device information
• Communication Data: Messages, reviews

2. USE OF INFORMATION
Your data is used for:
• Processing orders and transactions
• Customer support and communication
• Marketing and promotional updates
• Platform improvement and analytics
• Legal compliance requirements

3. DATA RETENTION
We retain your data:
• Active accounts: Indefinitely while active
• Completed transactions: 7 years per BIR requirements
• Inactive accounts: 2 years after last login
• Marketing: Until you unsubscribe

4. DATA PROTECTION (R.A. 10173 Compliance)
• Encryption: 256-bit SSL for all data transmission
• Access Control: Role-based permissions
• Retention: Only as long as necessary
• Disposal: Secure data destruction

5. YOUR RIGHTS (Under Data Privacy Act)
• Right to be informed
• Right to access your data
• Right to rectify inaccurate data
• Right to erasure ("Right to be forgotten")
• Right to data portability
• Right to object to processing`
    },
    {
      title: 'Consumer Rights (R.A. 7394)',
      icon: Users,
      content: `Your rights as a consumer are protected under the Consumer Act of the Philippines (R.A. 7394).

1. RIGHT TO INFORMATION
• Clear product specifications and descriptions
• Accurate pricing including VAT
• Seller identification and contact details
• Warranty terms and conditions

2. RIGHT TO SAFETY
• Products must meet safety standards
• Proper handling and storage
• Clear hazard warnings for dangerous materials
• Compliance with Philippine standards (BPS)

3. RIGHT TO CHOOSE
• Access to competitive products
• No forced bundling
• Alternative product options
• Fair competitive practices

4. RIGHT TO REDRESS
• Complaint filing process
• Refund and return policy
• Dispute resolution mechanism
• Assistance from DTI Consumer Protection

5. DISPUTE RESOLUTION
• Direct seller negotiation first
• Platform mediation available
• DTI Consumer Complaints (1-ATTITY)
• Small Claims Court for values below ₱100,000

6. DTI CONTACT FOR CONSUMER PROTECTION
• DTI Direct Hotline: 1-ATTITY (1-328-849)
• Email: consumercare@dti.gov.ph
• Regional Offices: dti.gov.ph/regional-offices`
    },
    {
      title: 'Warranty & Returns',
      icon: Package,
      content: `Warranty terms vary by seller. Constructo facilitates but does not guarantee warranties.

1. SELLER WARRANTIES
Each seller provides their own warranty:
• Warranty Period: As stated in listing
• Coverage: Parts, labor, or both
• Claim Process: Through seller's policy
• Service Location: Seller's designated service

2. TYPES OF WARRANTIES
• Manufacturer Warranty: Direct from maker
• Store Warranty: From authorized dealer
• Extended Warranty: Optional purchasable
• No Warranty: "Sold as is" items

3. WARRANTY CONDITIONS
Warranty typically does NOT cover:
• Normal wear and tear
• Misuse or abuse
• Unauthorized repairs
• Acts of nature (floods, earthquakes)
• Improper installation
• Consumable parts (blades, bits)

4. RETURN POLICY (Seller-Dependent)
• Change of mind: Not guaranteed
• Defective products: Must report within 48 hours
• Wrong item received: Must report within 24 hours
• Restocking fees: As per seller policy
• Shipping costs: Per seller agreement

5. HOW TO CLAIM
1. Contact seller through order details
2. Provide video/photo evidence
3. Follow seller's diagnosis process
4. Ship item if required (buyer/seller pays)
5. Receive replacement or refund

⚠️ NOTE: Some sellers offer no warranty. Always check product listing before purchasing.`
    },
    {
      title: 'Payment & Pricing (E-Commerce)',
      icon: CreditCard,
      content: `Secure transactions following Philippine e-commerce regulations (R.A. 8792).

1. PAYMENT METHODS
• Credit/Debit Cards (Visa, Mastercard, JCB)
• GCash / Maya / GrabPay
• Bank Transfer (BPI, BDO, Landbank)
• Cash on Delivery (COD) - Selected areas
• Installment (0% via CARD)

2. PRICING POLICY
• All prices include VAT (12%)
• Price changes: Before payment confirmation
• Promotional prices: Limited stock/time
• Hidden fees: None (except COD convenience fee)

3. PRICE MATCHING
Constructo does not guarantee price matching. Individual sellers set their own prices.

4. REFUND PROCESSING
• Original payment method: 5-15 business days
• Bank transfer: 7-21 business days
• COD: Cash or bank transfer
• Partial refund: For returns, deductions apply

5. SECURE TRANSACTIONS
Our platform uses:
• PCI-DSS compliant payment gateway
• Encrypted data transmission
• 2FA for high-value transactions
• Transaction verification

6. DISPUTED CHARGES
If you notice unauthorized charges:
1. Check order history first
2. Contact seller immediately
3. File dispute within 48 hours
4. Request transaction freeze`
    },
    {
      title: 'Shipping & Delivery',
      icon: ShoppingCart,
      content: `Delivery services across the Philippines.

1. SHIPPING PARTNERS
• LBC Express
• J&T Express
• Flash Express
• Grab / Lalamove (Express)
• Seller's own logistics

2. DELIVERY AREAS
• Metro Manila: 1-5 business days
• Luzon: 3-7 business days
• Visayas: 5-10 business days
• Mindanao: 7-14 business days
• Remote areas: Additional 3-5 days

3. SHIPPING FEES
• Calculated by: Weight, dimensions, location
• Free shipping: Per seller promotion
• Express delivery: Additional fee applies
• International: Not available yet

4. ORDER TRACKING
• Tracking number in order details
• Real-time updates via SMS/Email
• Platform order status tracking
• Direct courier tracking

5. DELIVERY ISSUES
• Lost packages: Seller/Platform liability
• Damaged items: Report within 24 hours
• Wrong address: Buyer responsibility
• Failed delivery: 3 attempts, then hold

6. CASH ON DELIVERY (COD)
• Available: Selected areas only
• Fee: ₱30-₱50 convenience fee
• Refusal: ₱100 penalty may apply
• Limit: ₱50,000 per order`
    },
    {
      title: 'Seller Responsibilities',
      icon: MapPin,
      content: `Sellers on Constructo must comply with Philippine laws.

1. SELLER REQUIREMENTS
• Valid business registration (DTI/BIR)
• Tax identification number (TIN)
• Physical store or warehouse
• Contact communication

2. PRODUCT COMPLIANCE
• Philippine Standards (PS) marked when required
• Bureau of Product Standards (BPS) compliance
• Proper labeling in English/Filipino
• Accurate weight and measures
• Hazardous material warnings

3. PRICING COMPLIANCE
• SRP (Suggested Retail Price) where applicable
• Price displayed must be honored
• No deceptive pricing
• VAT-inclusive display

4. DELIVERY OBLIGATIONS
• Ship within stated timeframe
• Accurate tracking information
• Proper packaging
• Insurance for fragile items

5. CUSTOMER SERVICE
• Response within 48 hours
• Clear return/refund policy
• Complaint escalation process
• Business hours: Posted clearly

6. PROHIBITED ITEMS
Cannot sell:
• Firearms and weapons
• Controlled substances
• Counterfeit products
• Stolen goods
• Prohibited electronics
• Endangered species products
• Items violating IP rights`
    },
    {
      title: 'Platform Liability',
      icon: AlertTriangle,
      content: `Understanding Constructo's role and limitations.

1. MARKETPLACE ROLE
Constructo operates as:
• Platform host/for marketplace
• Payment facilitator
• Order tracking system
• Dispute mediator

We are NOT:
• The seller of products
• A warranty provider
• A logistics company
• A manufacturer

2. LIABILITY LIMITS
We are not liable for:
• Seller product quality
• Shipping delays (beyond control)
• Force majeure events
• Third-party actions
• Customer misuse

3. DISPUTE RESOLUTION
Step 1: Buyer-Seller direct (7 days)
Step 2: Platform mediation (7 days)
Step 3: Document submission
Step 4: Resolution or escalation

4. INDEMNIFICATION
You agree to:
• Hold Constructo harmless in disputes
• Represent your own authority
• Not falsely represent products
• Use platform lawfully

5. GOVERNING LAW
Subject to Philippine Laws:
• Data Privacy Act 2012 (R.A. 10173)
• Consumer Act (R.A. 7394)
• E-Commerce Act (R.A. 8792)
• Civil Code of the Philippines
• Consumer Code of the Philippines

6. CONTACT US
• Customer Support: support@constructo.ph
• Business Inquiries: business@constructo.ph
• Compliance: legal@constructo.ph
• Phone: (02) 8-XXX-XXXX (Mon-Sat 9AM-6PM)`
    }
  ]

  return (
    <div className='w-full h-full flex flex-col bg-white pb-13'>
      <div className='w-full px-4 py-4 flex items-center justify-between border-b border-gray-100'>
        <button onClick={onGoBack} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
          <ArrowLeft size={24} className='text-gray-700'/>
        </button>
        <h1 className='text-lg font-bold text-gray-800'>Terms & Policy</h1>
        <div className='w-10'/>
      </div>

      <div ref={contentRef} className='flex-1 overflow-scroll px-4 py-2'>
        <div className='mb-4 pb-4 border-b border-gray-100'>
          <h2 className='text-xl font-bold text-gray-900 mb-2'>Constructo Terms & Conditions</h2>
          <p className='text-gray-500 text-sm'>Please read carefully. These terms comply with Philippine laws including R.A. 7394 (Consumer Act), R.A. 10173 (Data Privacy Act), and R.A. 8792 (E-Commerce Act).</p>
        </div>

        <div className='space-y-2'>
          {termsSections.map((section, index) => (
            <div key={index} className='border border-gray-200 rounded-2xl overflow-hidden'>
              <button
                onClick={() => toggleSection(index)}
                className='w-full px-4 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center'>
                    <section.icon size={20} className='text-orange-500'/>
                  </div>
                  <span className='font-semibold text-gray-800'>{section.title}</span>
                </div>
                {expandedSections.includes(index) ? (
                  <ChevronUp size={20} className='text-gray-400'/>
                ) : (
                  <ChevronDown size={20} className='text-gray-400'/>
                )}
              </button>
              
              {expandedSections.includes(index) && (
                <div className='px-4 py-4 bg-white border-t border-gray-100'>
                  <pre className='whitespace-pre-wrap text-sm text-gray-600 font-sans leading-relaxed'>
                    {section.content}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='mt-6 mb-20 p-4 bg-blue-50 rounded-2xl'>
          <h3 className='font-semibold text-blue-800 mb-2'>Your Rights Under Philippine Law</h3>
          <p className='text-sm text-blue-700'>
            You are protected under the Consumer Act of the Philippines (R.A. 7394), Data Privacy Act (R.A. 10173), and E-Commerce Act (R.A. 8792). You may file complaints with DTI if your rights are violated.
          </p>
        </div>
      </div>

      <div className={`absolute bottom-11 left-0 right-0 px-4 py-4 bg-white border-t border-gray-100 transition-transform duration-300 ${
        showButton ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <button
          onClick={() => setAgreed(true)}
          disabled={!showButton}
          className={`w-full h-14 rounded-2xl font-semibold text-base transition-all ${
            showButton 
              ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-200 active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          I Agree
        </button>
      </div>

      {agreed && (
        <div className='absolute bottom-14 inset-0 bg-black/50 flex items-end justify-center z-50'>
          <div className='w-full bg-white rounded-t-3xl p-6 pb-8'>
            <h3 className='text-lg font-bold text-gray-800 mb-2 text-center'>Terms Accepted!</h3>
            <p className='text-gray-500 text-center mb-4'>Thank you for reading our terms. You now have full access to Constructo.</p>
            <button
              onClick={() => onAgree?.()}
              className='w-full h-14 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-base hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200'
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TermsPolicy