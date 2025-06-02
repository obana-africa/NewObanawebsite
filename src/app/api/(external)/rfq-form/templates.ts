import { FormData, TrademarkFormData, SmeIncubationFormData } from "./types";
import {
	formatFormType,
	formatPrice,
	isProductionForm,
	isLabelForm,
	isFabricForm,
	isRawMaterialForm,
	isTrademarkForm,
	isSmeIncubationForm,
} from "./helpers";

export function generateProductDetailsSection(data: FormData): string {
	// console.log("Data:", data);
	const priceInfo = 'targetPrice' in data && data.targetPrice
		? formatPrice(data.targetPrice)
		: null;

	const budgetInfo = 'targetBudget' in data && data.targetBudget
		? formatPrice(data.targetBudget)
		: null;

	if (isProductionForm(data)) {
		return `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Product Details</h3>
        ${
					data.brandToSource
						? `<p><strong>Brand to Source:</strong> ${data.brandToSource}</p>`
						: ""
				}
        <p><strong>Product Type:</strong> ${data.productType}</p>
        <p><strong>Item Description:</strong> ${data.itemDescription}</p>
        ${data.style ? `<p><strong>Style:</strong> ${data.style}</p>` : ""}
        <p><strong>Size Range:</strong> ${data.sizeRange}</p>
        ${
					data.moq
						? `<p><strong>Minimum Order Quantity (MOQ):</strong> ${data.moq}</p>`
						: ""
				}
       ${
					priceInfo
						? `
              <p><strong>Target Price Currency:</strong> ${priceInfo.currency}</p>
              <p><strong>Target Price:</strong> ${priceInfo.amount}</p>
            `
						: ""
				}
      </div>
    `;
	} else if (isLabelForm(data)) {
		return `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Label Details</h3>
        <p><strong>Label Type:</strong> ${data.labelType}</p>
        <p><strong>Material Type:</strong> ${data.materialType}</p>
        <p><strong>Size:</strong> ${data.size}</p>
        ${
					data.moq
						? `<p><strong>Minimum Order Quantity (MOQ):</strong> ${data.moq}</p>`
						: ""
				}
        ${
					priceInfo
						? `
              <p><strong>Target Price Currency:</strong> ${priceInfo.currency}</p>
              <p><strong>Target Price:</strong> ${priceInfo.amount}</p>
            `
						: ""
				}
      </div>
    `;
	} else if (isFabricForm(data)) {
		return `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Fabric Details</h3>
        <p><strong>Fabric Category:</strong> ${data.fabricCategory}</p>
        <p><strong>Fabric Description:</strong> ${data.fabricDescription}</p>
        ${
					data.preferredBrand
						? `<p><strong>Preferred Brand:</strong> ${data.preferredBrand}</p>`
						: ""
				}
        <p><strong>Size Range:</strong> ${data.sizeRange}</p>
        ${
					data.moq
						? `<p><strong>Minimum Order Quantity (MOQ):</strong> ${data.moq}</p>`
						: ""
				}
        ${
					data.intendedUsage && data.intendedUsage.length > 0
						? `<p><strong>Intended Usage:</strong> ${data.intendedUsage.join(
								", "
						  )}</p>`
						: ""
				}
        ${
					priceInfo
						? `
              <p><strong>Target Price Currency:</strong> ${priceInfo.currency}</p>
              <p><strong>Target Price:</strong> ${priceInfo.amount}</p>
            `
						: ""
				}
        ${
					data.additionalComments
						? `<p><strong>Additional Comments:</strong> ${data.additionalComments}</p>`
						: ""
				}
      </div>
    `;
	} else if (isRawMaterialForm(data)) {
		return `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Raw Material Details</h3>
        <p><strong>Raw Material Type:</strong> ${data.rawMaterialType}</p>
        <p><strong>Material Description:</strong> ${
					data.materialDescription
				}</p>
        ${
					data.preferredBrand
						? `<p><strong>Preferred Brand:</strong> ${data.preferredBrand}</p>`
						: ""
				}
        <p><strong>Size/Specification Range:</strong> ${data.sizeSpecRange}</p>
        ${
					data.moq
						? `<p><strong>Minimum Order Quantity (MOQ):</strong> ${data.moq}</p>`
						: ""
				}
        ${
					data.applicationUse && data.applicationUse.length > 0
						? `<p><strong>Application Use:</strong> ${data.applicationUse.join(
								", "
						  )}</p>`
						: ""
				}
        ${
					priceInfo
						? `
              <p><strong>Target Price Currency:</strong> ${priceInfo.currency}</p>
              <p><strong>Target Price:</strong> ${priceInfo.amount}</p>
            `
						: ""
				}
        ${
					data.additionalComments
						? `<p><strong>Additional Comments:</strong> ${data.additionalComments}</p>`
						: ""
				}
      </div>
    `;
	} else if (isTrademarkForm(data)) {
		return `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Trademark Details</h3>
        <p><strong>Trademark Service Type:</strong> ${
					data.trademarkServiceType
				}</p>
        <p><strong>Industry Category:</strong> ${data.industryCategory}</p>
        <p><strong>Brand Name:</strong> ${data.brandName}</p>
        <p><strong>Brand Description:</strong> ${data.brandDescription}</p>
        <p><strong>Registration Location:</strong> ${
					data.registrationLocation
				}</p>
        ${
					budgetInfo
						? `
              <p><strong>Target Budget Currency:</strong> ${budgetInfo.currency}</p>
              <p><strong>Target Budget:</strong> ${budgetInfo.amount}</p>
            `
						: ""
				}
        ${
					data.additionalComments
						? `<p><strong>Additional Comments:</strong> ${data.additionalComments}</p>`
						: ""
				}
      </div>
    `;
	} else if (isSmeIncubationForm(data)) {
		return `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">SME Incubation Details</h3>
        <p><strong>Business Name:</strong> ${data.businessName}</p>
        <p><strong>Business Description:</strong> ${
					data.businessDescription
				}</p>
        <p><strong>Business Stage:</strong> ${data.businessStage}</p>
        <p><strong>Industry Category:</strong> ${data.industryCategory}</p>
        ${
					data.servicesRequired && data.servicesRequired.length > 0
						? `<p><strong>Services Required:</strong> ${data.servicesRequired.join(
								", "
						  )}</p>`
						: ""
				}
        <p><strong>Business Goals:</strong> ${data.businessGoals}</p>
        <p><strong>Incubation Duration:</strong> ${data.incubationDuration}</p>
        ${
					budgetInfo
						? `
              <p><strong>Target Budget Currency:</strong> ${budgetInfo.currency}</p>
              <p><strong>Target Budget:</strong> ${budgetInfo.amount}</p>
            `
						: ""
				}
        ${
					data.additionalComments
						? `<p><strong>Additional Comments:</strong> ${data.additionalComments}</p>`
						: ""
				}
      </div>
    `;
	}
	return "";
}

// Generate admin email template
export function generateAdminEmailTemplate(
	body: FormData,
	productDetailsSection: string
): string {
	return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://res.cloudinary.com/digm76oyr/image/upload/v1744893014/obana-logo.a86d1056_laai6x.png" 
             alt="Obana Office Logo" style="width: 100px;"/>
        <h2 style="color: #333; margin-top: 10px;">New ${formatFormType(
					body.formType
				)} RFQ Submission</h2>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Customer Information</h3>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Request Type:</strong> ${formatFormType(body.formType)}</p>
      </div>
      
      ${productDetailsSection}
      
      ${
				body.sampleProductUrl || body.sampleProduct
					? `
        <div style="margin-top: 15px;">
          <h4 style="color: #555; margin-bottom: 5px;">Sample Product:</h4>
          <img src="${
						body.sampleProductUrl || body.sampleProduct
					}" alt="Sample Product" style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; border-radius: 4px;"/>
        </div>
      `
					: ""
			}
      
      ${
				(body as TrademarkFormData).sampleLogoUrl ||
				(body as TrademarkFormData).sampleLogo
					? `
        <div style="margin-top: 15px;">
          <h4 style="color: #555; margin-bottom: 5px;">Sample Logo:</h4>
          <img src="${
						(body as TrademarkFormData).sampleLogoUrl ||
						(body as TrademarkFormData).sampleLogo
					}" alt="Sample Logo" style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; border-radius: 4px;"/>
        </div>
      `
					: ""
			}
      
      ${
				(body as SmeIncubationFormData).businessPlanUrl
					? `
        <div style="margin-top: 15px;">
          <h4 style="color: #555; margin-bottom: 5px;">Business Plan:</h4>
          <p><a href="${
						(body as SmeIncubationFormData).businessPlanUrl
					}" target="_blank">View Business Plan</a></p>
        </div>
      `
					: ""
			}
      
      </div>
      
      ${
				body.comment
					? `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Additional Comments</h3>
          <p>${body.comment}</p>
        </div>
      `
					: ""
			}
      
      <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">
        <p>This email was sent from your website RFQ form.</p>
      </div>
    </div>
  `;
}

// Generate customer email template
export function generateCustomerEmailTemplate(
	body: FormData,
	productDetailsSection: string
): string {
	return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://www.obana.africa/_next/static/media/obana-logo.77c735d1.svg" 
             alt="Obana Office Logo" style="width: 100px;"/>
        <h2 style="color: #333; margin-top: 10px;">Thank you for your ${formatFormType(
					body.formType
				)} RFQ submission!</h2>
      </div>
      
      <div style="margin-bottom: 20px;">
        <p>Dear ${body.name},</p>
        <p>We've received your ${formatFormType(
					body.formType
				)} request and our team will review it shortly.</p>
      </div>
      
      <div style="margin-bottom: 20px; background: #f5f5f5; padding: 15px; border-radius: 5px;">
        <h3 style="color: #555; margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Your RFQ Summary</h3>
        
        <div style="margin-bottom: 10px;">
          <p><strong>Request Type:</strong> ${formatFormType(body.formType)}</p>
        </div>
        
        ${productDetailsSection}
        
        ${
					body.sampleProductUrl || body.sampleProduct
						? `
          <div style="margin-top: 15px;">
            <h4 style="color: #555; margin-bottom: 5px;">Sample Product:</h4>
            <img src="${
							body.sampleProductUrl || body.sampleProduct
						}" alt="Your Sample Product" style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; border-radius: 4px;"/>
          </div>
        `
						: ""
				}
        
        ${
					(body as TrademarkFormData).sampleLogoUrl ||
					(body as TrademarkFormData).sampleLogo
						? `
          <div style="margin-top: 15px;">
            <h4 style="color: #555; margin-bottom: 5px;">Sample Logo:</h4>
            <img src="${
							(body as TrademarkFormData).sampleLogoUrl ||
							(body as TrademarkFormData).sampleLogo
						}" alt="Your Sample Logo" style="max-width: 100%; max-height: 300px; border: 1px solid #ddd; border-radius: 4px;"/>
          </div>
        `
						: ""
				}
        
        ${
					(body as SmeIncubationFormData).businessPlanUrl
						? `
          <div style="margin-top: 15px;">
            <h4 style="color: #555; margin-bottom: 5px;">Business Plan:</h4>
            <p><a href="${
							(body as SmeIncubationFormData).businessPlanUrl
						}" target="_blank">View Your Business Plan</a></p>
          </div>
        `
						: ""
				}
        
        ${
					body.comment
						? `
          <div>
            <h4 style="color: #555; margin-bottom: 5px;">Additional Comments</h4>
            <p>${body.comment}</p>
          </div>
        `
						: ""
				}
      </div>
      
      <div style="margin-bottom: 20px;">
        <p>Our team will review your ${formatFormType(
					body.formType
				)} request and get back to you shortly.</p>
      </div>
      
       <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">
        <p>obana.africa</p>
        <p>
            <a href="mailto:contact@obana.africa" style="color: #777; text-decoration: none;">📧 contact@obana.africa</a> | 
            <a href="tel:+2348096535511" style="color: #777; text-decoration: none;">📞 +234 809 653 5511</a> | 
            <a href="https://obana.africa" style="color: #777; text-decoration: none;">🌐 obana.africa</a>
        </p>
        <p style="margin-top: 10px;">This is an automated message. Please do not reply directly to this email.</p>
       </div>
    </div>
  `;
}
