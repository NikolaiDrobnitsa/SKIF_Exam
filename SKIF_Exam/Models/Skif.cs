namespace SKIF_Exam.Models
{
    public class Skif
    {
        public int Id { get; set; }
        public string? KnifeName { get; set; }
        public int KnifeCost { get; set; }
        public int KnifeStock { get; set; }
        public string KnifeSteelHardness { get; set; }
        public string KnifeSteelGrade { get; set; }
        public string KnifeLiningMaterial { get; set; }
        public string? KnifeImgUrl { get; set; }

    }
}
