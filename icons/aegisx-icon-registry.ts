// libs/shared/ui/icons/src/lib/aegisx-icon-registry.ts
// AegisX Drug Inventory Icon Registry
// ลงทะเบียน custom SVG icons เข้า Angular Material MatIconRegistry

import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/** ชื่อ icon ทั้งหมดในระบบคลังยา */
export const DRUG_INVENTORY_ICONS = [
  // --- Data & Catalog ---
  'drug-master',        // ข้อมูลยา GP/Trade Drug
  'tmt-catalog',        // บัญชียา TMT
  'supplier',           // บริษัทผู้จำหน่าย
  'lot-tracking',       // ติดตาม Lot

  // --- Procurement ---
  'purchase-requisition', // ใบขอซื้อ (PR)
  'purchase-order',       // ใบสั่งซื้อ (PO)
  'budget-ledger',        // งบประมาณ DR/CR

  // --- Warehouse Operations ---
  'goods-receive',      // รับเข้าคลัง (GR)
  'bin-location',       // ตำแหน่งจัดเก็บ
  'stock-overview',     // ภาพรวมสต็อก
  'stock-count',        // ตรวจนับสต็อก
  'transfer',           // โอนย้ายยา
  'drug-return',        // คืนยา

  // --- Picking & Delivery ---
  'zone-picking',       // หยิบยาตามโซน
  'wave-picking',       // หยิบแบบ Wave
  'delivery',           // จัดส่งยา

  // --- Dispensing & Safety ---
  'dispensing',         // เบิก-จ่ายยา
  'auth-lock',          // สิทธิ์ยาจำกัด (Drug Auth Lock)
  'fefo-expiry',        // วันหมดอายุ FEFO
  'drug-interaction',   // ยาตีกัน
  'barcode-scan',       // สแกนบาร์โค้ด

  // --- Monitoring ---
  'dashboard',          // รายงาน/แดชบอร์ด
  'alert',              // แจ้งเตือนยา
  'ven-abc',            // วิเคราะห์ VEN/ABC
] as const;

export type DrugInventoryIcon = (typeof DRUG_INVENTORY_ICONS)[number];

@Injectable({ providedIn: 'root' })
export class AegisxIconRegistry {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * ลงทะเบียน icon ทั้งหมดจากโฟลเดอร์ assets/icons/drug-inventory/
   * เรียกครั้งเดียวใน AppComponent หรือ APP_INITIALIZER
   *
   * @param basePath - path ไปยังโฟลเดอร์ icon (default: 'assets/icons/drug-inventory')
   */
  registerDrugInventoryIcons(basePath = 'assets/icons/drug-inventory'): void {
    for (const name of DRUG_INVENTORY_ICONS) {
      this.iconRegistry.addSvgIcon(
        name,
        this.sanitizer.bypassSecurityTrustResourceUrl(`${basePath}/${name}.svg`)
      );
    }
  }

  /**
   * ลงทะเบียน icon เดี่ยว (กรณีต้องการเพิ่มทีหลัง)
   */
  registerIcon(name: string, path: string): void {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path)
    );
  }
}
