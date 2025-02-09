import { FinancialPost } from "@/components/financial-post";
import { PostType } from "@/components/financial-post";

export function UserPosts() {
  const posts = [
    {
      id: 1,
      type: "Analysis" as PostType,
      author: {
        name: "Tyler Lamy",
        image: "",
        handle: "@tlam",
      },
      content:
        "Just bought a house in Alabama. #RealEstate #Investing #RetireEarly #Accounting #PWC #Crypto hjk jk hj hj hj k ghj gh ",
      timestamp: "2h ago",
      likes: 245,
      comments: [
        {
          id: 1,
          author: {
            name: "Ory Ratoviz",
            image: "",
          },
          content: "This is great but can you please pay my rent?",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          likes: 12,
        },
        {
          id: 2,
          author: {
            name: "Sora Sato",
            image: "",
          },
          content: "Did you hear about Kai and his gf",
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
          likes: 8,
        },
      ],
      shares: 12,
      saved: true,
    },
  ];

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <FinancialPost key={post.id} post={post} />
      ))}
    </div>
  );
}
