using Excel = Microsoft.Office.Interop.Excel;
using System.Reflection;


namespace _12het_excel_S08GKL
{
    public partial class Form1 : Form
    {

        Excel.Application xlApp;
        Excel.Workbook xlWB;
        Excel.Worksheet xlSheet;

        public Form1()
        {
            InitializeComponent();
            CreateExcel();
        }

        private void CreateExcel()
        {
            try
            {
                // Excel elind�t�sa �s az applik�ci� objektum bet�lt�se
                xlApp = new Excel.Application();

                // �j munkaf�zet
                xlWB = xlApp.Workbooks.Add(Missing.Value);

                // �j munkalap
                xlSheet = xlWB.ActiveSheet;

                // T�bla l�trehoz�sa
                CreateTable(); // Ennek meg�r�sa a k�vetkez� feladatr�szben k�vetkezik

                // Control �tad�sa a felhaszn�l�nak
                xlApp.Visible = true;
                xlApp.UserControl = true;
            }
            catch (Exception ex) // Hibakezel�s a be�p�tett hiba�zenettel
            {
                string errMsg = string.Format("Error: {0}\nLine: {1}", ex.Message, ex.Source);
                MessageBox.Show(errMsg, "Error");

                // Hiba eset�n az Excel applik�ci� bez�r�sa automatikusan
                xlWB.Close(false, Type.Missing, Type.Missing);
                xlApp.Quit();
                xlWB = null;
                xlApp = null;
            }
        }

        public void CreateTable()
        {
            string[] fejl�cek = new string[] {
                "K�rd�s",
                "1. v�lasz",
                "2. v�laszl",
                "3. v�lasz",
                "Helyes v�lasz",
                "k�p"
            };

            for (int i = 0; i< fejl�cek.Length; i++)
            {
                xlSheet.Cells[1,i + 1] = fejl�cek[i];
            }

            Models.HajosContext hajosContext = new Models.HajosContext();
            var mindenK�rd�s = hajosContext.Questions.ToList();

            object[,] adatT�mb = new object[mindenK�rd�s.Count(), fejl�cek.Count()];

            for (int i = 0; i < mindenK�rd�s.Count(); i++)
            {
                adatT�mb[i, 0] = mindenK�rd�s[i].Question1;
                adatT�mb[i, 1] = mindenK�rd�s[i].Answer1;
                adatT�mb[i, 2] = mindenK�rd�s[i].Answer2;
                adatT�mb[i, 3] = mindenK�rd�s[i].Answer3;
                adatT�mb[i, 4] = mindenK�rd�s[i].CorrectAnswer;
                adatT�mb[i, 5] = mindenK�rd�s[i].Image;
            }

            int sorokSz�ma = adatT�mb.GetLength(0);
            int oszlopokSz�ma = adatT�mb.GetLength(1);

            Excel.Range adatRange = xlSheet.get_Range("A2", Type.Missing).get_Resize(sorokSz�ma, oszlopokSz�ma);
            adatRange.Value2 = adatT�mb;

            adatRange.Columns.AutoFit();

            int lastRowID = xlSheet.UsedRange.Rows.Count;

            Excel.Range firstCollumn = xlSheet.get_Range("A1", Type.Missing).get_Resize(lastRowID, 1);
            firstCollumn.Font.Bold = true;
            firstCollumn.Interior.Color = Color.LightYellow;

            Excel.Range lastCollumn = xlSheet.get_Range("F1", Type.Missing).get_Resize(lastRowID, 1);
            lastCollumn.Interior.Color = Color.LightGreen;


            Excel.Range fejll�cRange = xlSheet.get_Range("A1", Type.Missing).get_Resize(1, 6);
            fejll�cRange.Font.Bold = true;
            fejll�cRange.VerticalAlignment = Excel.XlVAlign.xlVAlignCenter;
            fejll�cRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
            fejll�cRange.EntireColumn.AutoFit();
            fejll�cRange.RowHeight = 40;
            fejll�cRange.Interior.Color = Color.Fuchsia;
            fejll�cRange.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThick);





            Excel.Range fullRange = xlSheet.get_Range("A1", Type.Missing).get_Resize(lastRowID, 6);
            fullRange.Font.Bold = true;
            fullRange.VerticalAlignment = Excel.XlVAlign.xlVAlignCenter;
            fullRange.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
            fullRange.EntireColumn.AutoFit();
            fullRange.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThick);


            
        }
    }
}